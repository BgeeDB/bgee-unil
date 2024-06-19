#!/usr/bin/env perl

# Perl embedded modules
use strict;
use warnings;
use diagnostics;

$| = 1;

use FindBin qw($RealBin);
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
my ($help, $debug, $shuffle) = (0, 0, 0);
my ($sitemap_path)           = ('');
my ($check_url, $check_content, $check_links) = (0, 0, 0);
my %opts   = ('help|?'        => \$help,
              'debug|verbose' => \$debug,
              'sitemap=s'     => \$sitemap_path,
              'shuffle'       => \$shuffle,
             );

my $test_options = Getopt::Long::GetOptions(%opts);
help()  if ( !$test_options || $help );


# Read sitemap URLs
my $URL;
my $url_count = 0;
#Read local sitemap files
if ( $sitemap_path && -e "$sitemap_path/sitemap.xml" ){
    #TODO
}
#Read remote sitemap files
else {
    my $sitemap_url = $ENV{'BASE_URL'}.'/sitemap.xml';
    my $mech = WWW::Mechanize->new();
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


#TODO Actions
#$check_url, $check_content, $check_links


exit 0;


sub help {
    print "\n$0 [options]
\t--shuffle   Shuffle URLs to check
\t--debug     Verbose/Debug mode
\t--sitemap   Path of a local sitemap.xml file
\t--help      This message\n\n";
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

