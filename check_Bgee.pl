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
use Firefox::Marionette();

$ENV{'BASE_URL'} = 'https://www.bgee.org';

# Script options
my ($help, $debug, $shuffle)  = (0, 0, 0);
my ($sitemap_path)            = ('');
my ($check_url, $check_links) = (0, 0);
my ($specific_url)            = ('');
my %opts   = ('help|?'        => \$help,
              'debug|verbose' => \$debug,
              'sitemap=s'     => \$sitemap_path,
              'shuffle'       => \$shuffle,
              'check_url'     => \$check_url,
              'check_links'   => \$check_links,
              'url=s'         => \$specific_url,
             );

my $test_options = Getopt::Long::GetOptions(%opts);
help()  if ( !$test_options || $help );
help()  if ( !$specific_url && !$check_url && !$check_links );


# Read sitemap URLs
my $firefox = Firefox::Marionette->new(
    binary => '/home/smoretti/bin/firefox',
#    page_load => '', # a shortcut to allow directly providing the page_load timeout, instead of needing to use timeouts from the capabilities parameter. Overrides all longer ways. the document to load or the session's page_load duration to elapse before returning, which, by default is 5 minutes.
#    survive => '', # if this is set to a true value, firefox will not automatically exit when the object goes out of scope. See the reconnect parameter for an experimental technique for reconnecting.
);
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
#A specific URL
elsif ( $specific_url ne '' ){
    if ( $specific_url !~ /^$ENV{'BASE_URL'}/ ){
        die "\n\tInvalid URL [$specific_url] not in the $ENV{'BASE_URL'} domain\n\n";
    }

    $url_count++;
    push @{ $URL->{'specific'} }, $specific_url;
    $check_url = 1;
}
#Read remote sitemap files
else {
    my $sitemap_url = $ENV{'BASE_URL'}.'/sitemap.xml';
    $firefox->go("$sitemap_url");
    if ( $firefox->loaded() && $firefox->html() =~ m|<sitemap><loc>$ENV{'BASE_URL'}/sitemap_main\.xml</loc></sitemap>| ){
        my $sitemaps = parse_main_sitemap( $firefox->html() );
        SITEMAP:
        for my $sitemap ( @$sitemaps ){
            $firefox->go("$sitemap");
            if ( $firefox->loaded() && $firefox->html() =~ m|<url><loc>$ENV{'BASE_URL'}.*?</loc>| ){
                parse_sitemap( $firefox->html() );
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
warn "$url_count URLs\n"                                                          if $debug;
warn scalar keys %$URL, ' URL categories: ', join(', ', sort keys %$URL), "\n\n"  if $debug;


# Actions
$check_url = $check_links == 1 ? 1 : $check_url;
my %tests;
#Check Bgee URLs
if ( $check_url ){
    my @categories = $shuffle ? shuffle keys %$URL : sort keys %$URL;
    my $count = 0;
    CAT:
    for my $cat ( @categories ){
        my $CAT = sprintf('%03d', $count).$cat; # NOTE to be able to get always the same sorted key order at runtests!
        $tests{$CAT} = sub {
            plan tests => scalar @{ $URL->{$cat} };
            diag("\t[[[ $cat availability ]]]");
            URL:
            for my $url ( $shuffle ? shuffle @{ $URL->{$cat} } : @{ $URL->{$cat} } ){
                $firefox->go("$url");
                #FIXME does firefox wait till the page is fully loaded (with ajax calls and everything)?
                ok( $firefox->loaded() && $firefox->html() !~ /404 not found/, "[$url] loaded");
                # Test page links
                if ( $check_links && $firefox->loaded() && $firefox->html() !~ /404 not found/ ){
                    my %page_links;
                    map { $page_links{ $_->url_abs() }++ } $firefox->links();
                    #NOTE remove the URL to itself
                    delete( $page_links{ $specific_url} );
                    delete( $page_links{ "$specific_url#"} );
                    if ( $debug ){
                        warn "$_\t$page_links{ $_ }\n"  for sort keys %page_links;
                    }
                    #TODO ...
                }
                sleep 1;
            }
        };
        $count++;
    }
}


my $tester = TAP::Harness->new({
        timer       => 1,
        exec        => \&runner,
        verbosity   => 1,
        color       => 1,
});

$tester->runtests( sort keys %tests );
exit 0;


sub help {
    print "\n$0 [options]
\t--check_url    Check Bgee URLs
\t--check_links  Check links in Bgee URLs
\t--url          Check a specific Bgee URL
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

# From https://stackoverflow.com/questions/16584001/using-functions-in-tap-harness-instead-of-test-files
sub runner{
    my($harness,$test) = @_;

    my $builder = Test::More->builder;

    # reset the Test::Builder object for every "file"
    $builder->reset;
    $builder->{Indent} = ''; # may not be needed

    # collect the output into $out
    $builder->output(\my($out));     # STDOUT
    $builder->failure_output(\$out); # STDERR
    $builder->todo_output(\$out);    # STDOUT

    # run the test
    $tests{$test}->();

    # the output ( needs at least one newline )
    return $out;
}

