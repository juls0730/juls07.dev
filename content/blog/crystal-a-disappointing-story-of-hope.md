---
title: 'Crystal: A Disappointing Story of Hope'
description:
    I had a lot of hope for Crystal, but it wasn't as great as I thought it
    would be
image:
    src: /images/crystal-a-disappointing-story-of-hope.webp
    alt: 'Crystal: A Disappointing Story of Hope'
date: 2025-11-03T00:00
tags:
    - crystal
    - programming
---

I really wanted to like Crystal; the idea is amazing. “Imagine Ruby’s syntax
with a static type system, and a compiled executable”, that could give you an
outstanding first class developer expeirence, but in reality, it's not as simple
as that, and it never is.

Crystal is a language I’ve been following and interested in for quite some time
now. Crystal’s core idea has always really interested me. When I first heard of
Crystal, I was getting into Ruby, and I really like its philosophy of “Ruby but
statically typed and compiled”, ideally providing a more comprehensive developer
experience, a faster runtime, and more portability since executables can be
statically linked. I really wanted to like it, I really did, but its story isn't
that of an underrated language, but an underwhelming one.

<!-- more -->

The syntax of crystal is nice, it’s basically Ruby but with a static type
system, and I like Ruby’s syntax, and I like static types, it typically allows
for a much better developer experience and you dont end up with
[md5(&apos;240610708&apos;) equaling md5(&apos;QNKCDZO&apos;)](https://stackoverflow.com/questions/22140204/why-md5240610708-is-equal-to-md5qnkcdzo)
due to values being cast to superfluous types for no good reason. You can also
get better IntelliSense, usually, and often type errors and other things before
runtime. Despite the promising features, playing around with Crystal quickly
revealed a different story.

## Why Crystal failed me

### Tooling Failure

Crystal’s dev experience is less peachy than you would expect, given everything
I’ve told you so far. I write most of my code in VSCode, for lots of reasons,
since it’s just a web app means I can literally run a web server on a container
and have an instant dev environment available from anywhere as long as I have an
internet connection (and preferably more than 10” of screen). However, Crystal’s
tooling negates most of its usefulness.

For anything that matters, Crystal's support in VSCode is terrible, and this is
**with the crystal-lang-tools VSCode extension installed**. Without it, there is
no native support for Crystal _at all_, which isn’t terribly surprising if I’m
being honest. The crystal tooling seems to be largely community-driven, which
can be a good thing, but the vscode-crystal-lang extension on their GitHub
organization has almost no activity, with the latest code change being 3 months
ago and the commit before that being 9 months old at the time of writing. This
lackluster tooling extends into its LSP as well.

### LSP Limitations

The LSP often gives you outdated errors, and it starts to give me headaches
after using it for any period of time. Its hints on hover are also not amazing,
they are slow to appear, and 99% of the time, it gives you no more useful
information than the type of the variable, in fact, most of the time, it gives
you no hints whatsoever, and it makes you wonder if the problem is the LSP being
unbelievably slow, or if the LSP _just sucks_.

![Crystal complaining about invalid code that no longer exists, reading “expecting identifier ‘end’, not ‘in’”](/images/crystal-a-disappointing-story-of-hope/Capture-20251022123246-1isu4s3.png)

There is **no autocomplete whatsoever**; you won't get recommendations for
functions ever, not even built-in functions, _nothing_. The syntax highlighting
is often lacking, and once again, it has no idea of functions that have been
registered, leaving them un-highlighted. The only things that get highlighted
are primitives and reserved keywords, aka basic functions, though you just have
to know they exist without autocomplete. Which is definitely possible,
autocomplete is not necessary, that’s the whole point of writing code on paper
is to prove you _can_ write code without your nice IDE sugar and spice, but
writing code on paper is generally an exercise to prove you _can_ do it. Imagine
writing code like that _forever_; that’s what writing Crystal is like. In the
modern development ecosystem, this is unthinkable for many devs.

Crystal has an ERB replacement that is nice to use and is nearly identical to
ERB. However, while _sometimes_ it may be nice to use, _it often pains me to
write_. Crystal tags in ECR files are not parsed or highlighted or anything
really, and they often **break syntax highlighting of the entire file**, with no
option for recourse other than to just give up or do something completely
differently.

![an embedded crystal tag in a style tag completely destroying all syntax highlighting.](/images/crystal-a-disappointing-story-of-hope/highlight-20251022123336-idkrtky.png)

Here, I'm putting a crystal tag in a style tag, and that just breaks everything.
The reason for putting a crystal tag in a style tag is to embed the CSS for the
page, so there is no FOUC. The solution would be to print the entire <style> tag
in the crystal string that it will output, or to just use an external CSS file
like a sane person, maybe. What's more upsetting is how decent, just _basic_
HTML highlight looks.

![What syntax highlighting should look like when its working correctly.](/images/crystal-a-disappointing-story-of-hope/correct-highlight-20251022123411-83bxajs.png)

However, since ECR is nearly identical to ERB, you can rely on the mature and
actually decent tooling for ECR files. For example, here’s the same example I
have above, but I tell VSCode that ECR files are actually just ERB files and to
highlight them like so:

![Correct syntax highlighting of the ECR file with the ECR tag in the style tag by forcing ERB highlighting](/images/crystal-a-disappointing-story-of-hope/perfect-highlight-20251022123432-7lo3bj7.png)

Using crystal highlighting often gives you a better experience than the Crystal
lang extension gives you, but unfortunately, it can't fix the terrible LSP that
Crystal gives you, and highlighting Crystal code outside of ECR files as Ruby is
not a great experience either.

Furthermore, Crystal’s compile times are a bit underwhelming, and if you use a
watch script to increase the development speed and use of Crystal, you’ll be
waiting a hot second for Crystal to recompile, even when in dev mode. This
further worsens the usefulness of Crystal as a web server-focused language. I’m
constantly looking for languages that would be ideal as a web server language,
that provides an amazing DX, a good type system, and fast iteration. JavaScript
really seems to be the best option as far as I can tell. While JavaScript has
its pros, it also has plenty of cons. The attitude in the JavaScript ecosystem
is to use someone else's wheel, but in JavaScript's case we have 120,000 wheels
that all depend on each other. In my experience, the overreliance on JavaScript
makes for a really bloated server executable and an unpleasant client-side
experience.

### Syntactical decisions

Crystal is meant to be a very close analogue to Ruby, but many of its syntax
decisions are frustrating, to put it lightly. **Crystal does not support for
loops**, and attempting to write one will throw confusing and unhelpful errors.
What's worse is that the **Crystal devs know this**: In their article
[Crystal for Rubyists](https://crystal-lang.org/reference/1.16/crystal_for_rubyists/index.html),
they have this section about for loops:

![A section from Crystal’s “Crystal for Rubyists” on for loops, reading “for loops are not supported. Instead, we encourage you to use Enumerable#each. If you still want a for, you can add them via a macro:” followed by the macro expression you would use to define for loops in Crystal.](/images/crystal-a-disappointing-story-of-hope/what-20251022123544-n2csf49.png)

This is something I absolutely despise seeing in languages, removing features
for no good reason; they even know this and give you a solution to their poorly
made decisions. Instead, if you want to loop 5 times, your code might look like
one of these:

```crystal

(0..4).each { |i| puts "Hello, world #{i}" }

(0..4).each do |i|
	puts "Hello, world #{i}"
end

5.times do |i|
	puts "Hello, world #{i}"
end
```

I don’t hate this syntax, and I even quite like the `5.times` syntax, which
gives you a plain English explanation of what the code is doing from the code
itself, but why remove for loops? It just doesn’t make sense to me, especially
since Ruby already has ranges. Writing for loops would be a breeze for anyone
familiar with Ruby or Rust, or the dozens of other languages that share roughly
the same for loop syntax.

While the Crystal team encourages `Enumerable#each` for a more idiomatic
approach aligned with functional programming, the complete removal of `for`
loops feels like an unnecessary hurdle, especially when they acknowledge the
demand by providing a solution to the problem they themselves invented.

Crystal, despite being a compiled language, doesnt really have many good options
for low-level things, which can be fine given it’s meant to be a replacement for
ruby, but Crystal at least _tries_ by allowing you to link to C interfaces, but
severely lacks many low-level features that would be nice to use if I wanted to
use Crystal as a more general purpose language rather than a compiled Ruby
replacement. As I’ve been getting more into low-level stuff, I’ve liked the idea
of playing around with languages in a lower-level fashion, but Crystal is a bit
lacking. Despite being built on top of LLVM, it cannot compile to every target
LLVM supports, not without _patching the compiler_.

### Community

Crystal, being a smaller language, is obviously going to have less community
support for things; even so, its support isn’t terrible. There are lots of
“shards,” aka gems, if you’re familiar with Ruby’s terminology for these types
of packages. However, it appears there's limited effort dedicated to
significantly improving the developer tooling. The docs are okay, but only if
you’re comfortable navigating and reading an API specification; outside of that,
the docs are somewhat lacking. Shards can be helpful to give you easy solutions,
but as with most languages that strongly lean on packages, like Rust or
JavaScript, this ultimately leads to an over-dependence on packages and leads to
an overrun in executable sizes.

## What Crystal does well

Not everything Crystal has to offer is negative, however. Crystal’s type safety
and performance are nice, but its benefits are far overshadowed by its poor
development experience and its borderline non-existence of intellisense. Its
shard system can be nice at times. Since its syntax is basically Ruby, it’s easy
to pick up, and can be nice to write, when it's cooperating, so basically when
the LSP isn’t working at all. Its OOP-focused design can sometimes lead to some
nice paradigms, even as much as I hate OOP design sometimes. It's nice to be
able to link to C libraries if I so please; it's just unfortunate that Crystal
attempts to create a "safe language", but isn’t nearly as deep or as mature as
Rust, Zig, or Go. The binary size is a nice break from Golang or Rust; the
simple blog prototype I played around with only weighed in at 4.2MB in release
mode. It's not small by any means, but it is a stark comparison to the binary
sizes I have dealt with when writing dramatically simpler Rust or Go programs.

## Conclusion

I really actually wanted to like Crystal, its idea is amazing, and I’ve been
watching it since even before it went stable, but it really missed the mark for
me, unfortunately. Its strange decisions on its syntax, and the terrible
developer experience have really made the experience sub-par. It’s unfortunate
that such a good idea was implemented poorly, but then again, “There are only
two kinds of languages: the ones people complain about and the ones nobody
uses.”

If you liked this blog post, maybe consider supporting me, or if you didn't,
maybe [give Crystal a try](https://crystal-lang.org/). Regardless of what you
think, thanks for reading, and have a nice day!
