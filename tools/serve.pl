#!/usr/bin/env perl
# -----------------------------------------------------------------------------
# Minimal zero-dependency static file server (Perl core modules only).
# Useful on machines without Node/Python (e.g. Git Bash on Windows):
#
#   perl tools/serve.pl [port]
#
# Then open http://localhost:8899/  (Ctrl+C to stop)
# -----------------------------------------------------------------------------
use strict;
use warnings;
use IO::Socket::INET;
use File::Basename qw(basename);

my $port = shift(@ARGV) || 8899;
my $root = ".";
my %mime = (
  html => "text/html; charset=utf-8", htm => "text/html; charset=utf-8",
  css  => "text/css; charset=utf-8",
  js   => "application/javascript; charset=utf-8",
  mjs  => "application/javascript; charset=utf-8",
  json => "application/json; charset=utf-8",
  svg  => "image/svg+xml", png => "image/png", jpg => "image/jpeg",
  jpeg => "image/jpeg", gif => "image/gif", webp => "image/webp",
  ico  => "image/x-icon", txt => "text/plain; charset=utf-8",
  md   => "text/markdown; charset=utf-8", pdf => "application/pdf",
  woff => "font/woff", woff2 => "font/woff2", wasm => "application/wasm",
);

my $server = IO::Socket::INET->new(
  LocalAddr => "127.0.0.1", LocalPort => $port,
  Proto => "tcp", ReuseAddr => 1, Listen => 32,
) or die "Cannot bind to 127.0.0.1:$port: $!\n";

print "Serving $root at http://127.0.0.1:$port/  (Ctrl+C to stop)\n";

while (my $client = $server->accept()) {
  my $peer = $client->peerhost();
  $client->autoflush(1);

  # --- read request head -----------------------------------------------------
  my ($request, $line);
  for (1 .. 64) {
    last if !defined($line = <$client>) || $line =~ /^\r?\n$/;
    $request .= $line;
  }
  my ($method, $path) = $request =~ m{^([A-Z]+)\s+(\S+)} or do { close $client; next; };

  if ($method ne "GET" && $method ne "HEAD") {
    respond($client, "405", "text/plain", "Method Not Allowed");
    close $client;
    next;
  }
  $path =~ s/\?.*//;
  $path =~ s/%([0-9A-Fa-f]{2})/chr(hex($1))/eg;

  # --- resolve + secure the path ----------------------------------------------
  $path = "/" if $path eq "/";
  my $rel = $path;
  $rel =~ s{^/+}{};
  $rel = "index.html" if $rel eq "";
  # collapse ./ and reject any .. escapes
  my @parts;
  for my $seg (split m{/+}, $rel) {
    next if $seg eq "" || $seg eq ".";
    if ($seg eq "..") { @parts = (); last; }   # never allow traversal
    push @parts, $seg;
  }
  my $file = join("/", $root, @parts);
  if ($path =~ m{/$} && !-f $file) { $file = join("/", $root, @parts, "index.html"); }

  if (!-f $file) {
    respond($client, "404", "text/plain", "Not Found: $path\n");
    close $client;
    next;
  }
  my $ext = lc(($file =~ /\.([^.]+)$/)[0] || "");
  my $type = $mime{$ext} || "application/octet-stream";

  if ($method eq "HEAD") {
    $client->print("HTTP/1.1 200 OK\r\nContent-Type: $type\r\nCache-Control: no-store\r\nConnection: close\r\n\r\n");
    close $client;
    next;
  }
  open my $fh, "<:raw", $file or do { respond($client, "404", "text/plain", "Not Found\n"); close $client; next; };
  binmode $fh;
  local $/; my $body = <$fh>;
  close $fh;

  my $clen = length($body);
  $client->print(
    "HTTP/1.1 200 OK\r\nContent-Type: $type\r\n" .
    "Cache-Control: no-store\r\nContent-Length: $clen\r\nConnection: close\r\n\r\n"
  );
  $client->print($body);
  close $client;
}
close $server;

sub respond {
  my ($c, $code, $type, $text) = @_;
  $c->print("HTTP/1.1 $code\r\nContent-Type: $type\r\nConnection: close\r\n\r\n$text");
}
