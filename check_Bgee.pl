#!/usr/bin/env perl

# Perl embedded modules
use strict;
use warnings;
use diagnostics;

$| = 1;

use File::Slurp;
#use FindBin qw($RealBin);
use Getopt::Long;
use List::Util qw(shuffle);
use TAP::Harness;
use Test::More 'no_plan';
use WWW::Mechanize;

my $tester = TAP::Harness->new({
        timer       => 1,
        verbosity   => 1,
        color       => 1,
});

$ENV{'BASE_URL'} = 'https://www.bgee.org';

# Script options
my ($help, $debug, $shuffle)  = (0, 0, 0);
my ($sitemap_path)            = ('');
my ($check_url, $check_links) = (0, 0);
my %opts   = ('help|?'        => \$help,
              'debug|verbose' => \$debug,
              'sitemap=s'     => \$sitemap_path,
              'shuffle'       => \$shuffle,
              'check_url'     => \$check_url,
              'check_links'   => \$check_links,
             );

my $test_options = Getopt::Long::GetOptions(%opts);
help()  if ( !$test_options || $help );


# Read sitemap URLs
my $mech = WWW::Mechanize->new();
my $URL;
my $url_count = 0;
#Read local sitemap files
if ( $sitemap_path && -e "$sitemap_path/sitemap.xml" ){
    my $content = read_file("$sitemap_path/sitemap.xml");
    my $sitemaps = parse_main_sitemap( $content );
    SITEMAP:
    for my $sitemap ( @$sitemaps ){
        my ($local_path) = $sitemap =~ m|$ENV{'BASE_URL'}/(sitemap_\w+\.xml)|;
        if ( -e "$sitemap_path/$local_path" ){
            my $content = read_file("$sitemap_path/$local_path");
            parse_sitemap( $content );
        }
        else {
            warn "\n\tCannot read [$sitemap_path/$local_path]\n\n";
        }
    }
}
#Read remote sitemap files
else {
    my $sitemap_url = $ENV{'BASE_URL'}.'/sitemap.xml';
    $mech->get("$sitemap_url");
    if ( $mech->success() && $mech->content() =~ m|<sitemap><loc>$ENV{'BASE_URL'}/sitemap_main\.xml</loc></sitemap>| ){
        my $sitemaps = parse_main_sitemap( $mech->content() );
        SITEMAP:
        for my $sitemap ( @$sitemaps ){
            $mech->get("$sitemap");
            if ( $mech->success() && $mech->content() =~ m|<url><loc>$ENV{'BASE_URL'}.*?</loc>| ){
                parse_sitemap( $mech->content() );
            }
            else {
                warn "\n\tCannot reach [$sitemap]\n\n";
            }
        }
    }
    else {
        die "\n\tCannot reach [$sitemap_url]\n\n";
    }
}
warn "$url_count URLs\n"                                                        if $debug;
warn scalar keys %$URL, ' URL categories: ', join(', ', sort keys %$URL), "\n"  if $debug;


# Actions
$check_url = $check_links == 1 ? 1 : $check_url;
#Check Bgee URLs
if ( $check_url ){
    my @categories = $shuffle ? shuffle keys %$URL : sort keys %$URL;
    CAT:
    for my $cat ( @categories ){
        URL:
        for my $url ( $shuffle ? shuffle @{ $URL->{$cat} } : @{ $URL->{$cat} } ){
            $mech->get("$url.23");
            ok( $mech->success() && $mech->content() !~ /404 not found/, "[$url] loaded");
#            sleep 1;
        }
        last;
    }
}

exit 0;


sub help {
    print "\n$0 [options]
\t--check_url    Check Bgee URLs
\t--check_links  Check links in Bgee URLs
\t--shuffle      Shuffle URLs to check
\t--sitemap      Directory of a local sitemap.xml file
\t--debug        Verbose/Debug mode
\t--help         This message\n\n";
    exit 1;
}

sub parse_main_sitemap {
    my ($sitemap_content) = @_;

    my @sitemaps;
    push @sitemaps, map  { m|<sitemap><loc>($ENV{'BASE_URL'}/sitemap_\w+\.xml)</loc>|; $1 }
                    grep { /$ENV{'BASE_URL'}/ }
                    split(/<\/sitemap>/, $sitemap_content);

    warn join("\n", @sitemaps), "\n"  if $debug;

    return \@sitemaps;
}

sub parse_sitemap {
    my ($sitemap_content) = @_;

    URL:
    for my $url_loc ( grep { /$ENV{'BASE_URL'}/ } split(/<\/url>/, $sitemap_content ) ){
        my ($url) = $url_loc =~ m|<loc>($ENV{'BASE_URL'}.*?)</loc>|;
        my ($dir) = $url     =~ m|$ENV{'BASE_URL'}/([^/]*)/.+|;
        $dir = $dir || 'main'; #NOTE if $dir is empty
        push @{ $URL->{$dir} }, $url;
        $url_count++;
    }

    return;
}

