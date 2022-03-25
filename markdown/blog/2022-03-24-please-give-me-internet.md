---
title: Can I just please have internet?
date: 2022-03-24T00:00:00.000Z
description: The story of how it took way too long to get an internet connection at my new place
blog: true
path: /blog/please-give-me-internet/
tags:
- internet
- isp
- routing
- moving
- fiber
---

<p></p>

This is the story of how I ended up desperate enough to be using Twitter to try to get help with getting an internet
connection at my new place.

<div class="centered-column">
<blockquote class="twitter-tweet" data-lang="en" data-theme="dark"><p lang="en" dir="ltr"><a href="https://twitter.com/ATTHelp?ref_src=twsrc%5Etfw">@ATTHelp</a> Today is the 6th day I&#39;ve been without internet after 2 no-shows from technicians. I just need to be sent a registered ONT. Can you just mail one to me, please?</p>&mdash; Justin Kaufman (@akaritakai) <a href="https://twitter.com/akaritakai/status/1504540181508067329?ref_src=twsrc%5Etfw">March 17, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

But first, a disclaimer:

> **I am currently happy with where I am now for internet access at my new place.** <br>
> <br>
> I'm not happy about how long it took to set up, and I'm definitely not pleased about how AT&T plans to break my
> power-user setup in the future. But, I generally find AT&T's fiber infrastructure to be rock solid. And, I know many
> people work really hard to make it that way.

So what went wrong? Let's start at the beginning.

## Fiber internet is awesome

I had a full 1 Gbps symmetric fiber connection at my old place. And once I had experienced that, I wasn't going to be
happy with anything else. Fiber internet doesn't just offer faster bandwidth, but latency too. In the US, most cable
internet connections utilize a standard called [DOCSIS](https://en.wikipedia.org/wiki/DOCSIS) to provide an internet
connection over a coax cable. This protocol includes some complex encoding schemes and media acquisition protocols that
can add many milliseconds of latency to the connection (on top of signal conversion). There's
[a white paper](https://tools.ietf.org/id/draft-white-tsvwg-lld-00.html#rfc.section.5) to add a low-latency
specification to DOCSIS, but it won't remove the problem entirely. Most fiber-to-the-home (FTTH) setups don't incur this
kind of penalty and are much faster.

If the difference was 1ms on fiber vs. 10ms on cable for a given connection, and you had a site that made several layers
of requests like this:

<div class="centered-column">
<img alt="A waterfall plot for a website" src="/assets/img/att-internet-1.webp" width="500">
</div>

Then, for the four layers shown, our request would only take 4ms on fiber but would take 40ms on cable. That doesn't
sound like a lot, but it's clear how the difference could start compounding!

And that's just the latency. The real problem with cable internet is how low the upload speeds are.
[As of this writing](https://www.cnet.com/home/internet/xfinity-internet-review/), Xfinity's Gigabit package offers
more than 1 Gbps download speed, but only 35 Mbps upload! And when you find yourself needing to upload a video or large
file, the difference is enormous:

<div class="centered-column">
<img alt="A graph displaying the difference between cable and fiber upload speeds" src="/assets/img/att-internet-2.webp" width="600">
</div>

So now that I had settled on finding a new place with at least a 1 Gbps symmetric fiber connection. How was I going to
do it?

## Finding a place with fiber internet

Unfortunately, trying to shop for a home with a specific internet connection in the US is somewhat difficult. The FCC
defines a [high-speed broadband connection](https://www.fcc.gov/general/measuring-broadband-america) as 25 Mbps down and
3 Mbps up. So searching for apartment listings for "high-speed internet" is almost useless. Trying to search for "fiber
internet" can also be fruitless: AT&T rolled out U-Verse fiber service to nodes near houses and then used phone lines to
provide "fiber internet" VDSL connections.

Instead, you need to be aware of all the ISPs in your area that provide high-speed internet access and then
painstakingly check the address with each ISP. While some [tools](https://www.allconnect.com/) can help with at least
_finding_ ISPs, it may also miss opportunities with lesser-known or regional ISPs such as
[SilverIP](https://silverip.com/) or [Webpass](https://webpass.net/). It may also show internet providers that aren't
even supported at the given location! Even if you know what ISPs will service your new place, you may still face
problems. If someone is still living there, the ISP's site may error and say, "We can't show/sell you plans for that
service address because that address already has service." Frustrating.

Luckily, in terms of finding an apartment with fiber access, AT&T has really stepped up and provided a great tool: the
[AT&T Fiber Network Locator](https://www.att.com/att/multifamily-property/locator/). This lets you see all the apartment
complexes that support fiber, and then you can check them out one by one and hopefully find the right place for you.

So, I did find such a place and scheduled my move. I already had my AT&T-provided residential gateway (RG) from my last
place. Naturally, I assumed that moving would be fairly straightforward: I would take my RG with me and plug it into the
apartment's Optical Network Terminal (ONT), give AT&T a quick call, and be done. After all, that had been my previous
experience when I moved from one place with AT&T Fiber to another.

Boy was that wrong.

## How does fiber internet work?

Let's cover really quick what is actually required to get AT&T Fiber Internet:

<div class="centered-column">
<img alt="A graph displaying the typical setup for AT&T Fiber" src="/assets/img/att-internet-3.webp" width="950">
</div>

A fiber line comes through the wall, gets converted from a fiber connection to ethernet through an ONT provided by AT&T,
which then comes to an RG (also provided by AT&T) which acts like a typical consumer Wi-Fi/router combo. Sometimes these
two devices are combined into a single unit (more on that later), but I needed an external ONT for the RG I had.

It's important to note that these are not off-the-shelf devices and have to be provided explicitly by AT&T. Typically,
when an ONT is installed in your place, the technician registers it to that address. When you move, you leave the ONT
behind. Only a registered ONT for that address will work. Similarly, the RG has certificates that allow you to
authenticate and receive internet access to the network, so only AT&T's RG will work.

That's what I should have had. What I actually had looked like this:

<div class="centered-column">
<img alt="A graph displaying what my place came with for Internet hook-ups" src="/assets/img/att-internet-4.webp" width="950">
</div>

Well, crap. I would have to have a technician come out and provide me with an ONT (or somehow talk AT&T into
sending me one). When I called AT&T to set that up, I got an exciting offer from the person taking care of that.


> "You know, we also offer 2 Gbps and 5 Gbps symmetric packages at your location. Would you like to upgrade?" <br>
> Um, yes. Yes, please. <br>
> "The earliest we can get a technician to come out and install it will be 2 days from now." <br>
> I'd like it to be earlier, but I can go a few days without internet. I need to unpack anyway.


So two days go by, and I'm starting to research and ponder all the upgrades I need to do to take advantage of the faster
speeds. I also had concerns about whether my existing setup would work with the new equipment.

> How on earth could your existing setup not work?

For whatever reason, I'm just the kind of person who likes to run his own router, switches, and Wi-Fi access points. I
could argue that it's because of performance purposes, the educational aspects of learning new tech, faster security
updates, a need to isolate my IoT devices, or just liking the idea of having more configuration options. The truth is a
little of all of the above. So, I really want to not have the RG at all and just plug a router directly into the wall to
get my assigned IPv4 address and my IPv6 block.

The way the RG authenticates to AT&T's network looks something like this:

<div class="centered-column">
<img alt="A diagram of the RG's authentication to the ONT" src="/assets/img/att-internet-5.webp" width="450">
</div>

So, unfortunately, you need the RG to authenticate to the ONT via 802.1X using the certificates present on the RG. One
might think just plugging in the router to the RG is fine, but there are some serious quality of life issues, including:

- The router is NATed (even if it's given the WAN IP address) and suffers from a small table size and session limits
- You can only get an IPv6 /64 block instead of a /60 block
- You cannot control when the RG will update or how it will deal DHCP leases to you

Some of these are absolute deal-breakers. I personally have a lot of devices on my network, and at the start of the
pandemic, I routinely ran out of NAT sessions in large Zoom meetings.

So is there any way to get the more "pure" setup? Absolutely. My own setup looks like this:

<div class="centered-column">
<img alt="A diagram of my bypass" src="/assets/img/att-internet-6.webp" width="600">
</div>

I use [this project](https://github.com/MonkWho/pfatt) to forward just the 802.1X traffic to the RG and let it
authenticate to the ONT for me. Then, I let my own router handle all the rest. This works perfectly for me (including
getting the standard IPv6 /60 block via DHCP6). Some people even take it further and extract the certificates from the
RG itself, so it doesn't even need to be connected. However, that requires the ability to extract AT&T's firmware from 
the device. Fun fact: apparently, the RG certificates are not unique, so if you can find another RG that you can extract
certificates from, you can just use those.

> How would new equipment impact this bypass?

This approach really requires that the ONT and RG are separate entities. The ONT I have is the Nokia G-010G-A, which
only provides a 1 Gbps ethernet output. To the best of my knowledge, for >1 Gbps fiber installs, AT&T provides a
gateway that combines the ONT and RG (the BGW320-505) and does not provide an ONT capable of those speeds. I have seen
[some rumors](https://www.dslreports.com/forum/r33298178-Meet-the-Nokia-XS-020X-A) of a Nokia XS-020X-A, which has a 10
Gbps port (which would allow me to upgrade to 5 Gbps with my old RG), but I have also seen rumors that the 10 Gbps port
is disabled and unusable currently.

> Can you just place a device between the Fiber Link and the ONT to create the bypass?

Indications [per this thread](https://www.dslreports.com/forum/r32605799-BGW320-505-new-gateway-with-integrated-ONT) are
that no one has such a bypass working. So, if we were to take that approach, we would have to create our own. The first
step is figuring out how AT&T's network works. We can do some
[patent searches](https://patents.google.com/patent/US7873276B2/) and examine AT&T's Open OMCI specification to make
some reasonable guesses as to the internals.

<div class="centered-column">
<img alt="A diagram of how the ONT and RG communicate with AT&T's network" src="/assets/img/att-internet-7.webp" width="600">
</div>

More research is needed here clearly but is challenging  to do given the restricted access to hardware and the
locked-down nature of AT&T's network.

## The issues begin

Anyway, a few days pass, and the technician is a no-show. I call AT&T, and they indicate that it is due to a
"facilities" issue, but that could mean anything. Does that mean my fiber link is broken?

I purchased a fiber cable and took the ONT out of my old place to test if the fiber link was working.

<div class="centered-column">
<img alt="A picture of me removing an ONT from my old place" src="/assets/img/att-internet-8.webp" width="500">
<img alt="A picture of me using an ONT to test my network connection" src="/assets/img/att-internet-9.webp" width="500">
</div>

The lights confimed that the fiber link was working, so I put the ONT back where it belonged. Hopefully, it didn't cause
the ONT to be blacklisted for the next tenant by plugging it in elsewhere.

So after verifying that the fiber connection is working and making some more calls, I was able to deduce the likely
problem: there's an issue with my building that prevents the use of XGS-PON (required for 5 Gbps) and only GPON is
available. That's fine by me because maybe I can still keep my bypass.

I called AT&T back up again and canceled my order for 5 Gbps. Then, I set up just a move order for my 1 Gbps service.
The person on the other end tells me a ticket to summon a technician has actually been made this time! Progress! I just
have to wait for a few more days for the next appointment, but at least things are going smoothly.

Until the day of the appointment rolls around and the technician is a no-show for the 8 am to 10 am block. At this
point, I've been without internet for 6 days, and I am beyond annoyed. All I need is a registered ONT at my location and
a tech to register it. Hell, if they pre-register it back at the office and mail it to me, then _I_ could plug it in.

<div class="centered-column">
<img alt="A picture indicating where the ONT should be plugged in" src="/assets/img/att-internet-10.webp" width="500">
</div>

So, I called up again, and surprise, surprise, the work order was there, but it didn't get added to the technician's
schedule. I managed to get them to talk to the technician's manager, and we managed to schedule them to come after their
current appointment, which should be by 12:45 pm, but could be later.

I waited until 3:00 pm for a phone call for them to say they were on their way. At which point I told them that I would
be a pretty easy job -- I was just missing the ONT.

Finally, at 3:30 pm, they showed up and brought the ONT I needed. The first one was defective (I guess I'm glad I didn't
have them ship me one), but the second one worked just fine, so I was up and running at full gigabit speeds less than 30
minutes later.

## What I learned

1. Arrange for internet to be installed before your move-in date
2. Know what other ISPs you can use temporarily if there's an issue with getting internet from another ISP
3. Some apartment complexes might be wired for other ISPs but have an arrangement to only provide one ISP's service
4. AT&T really doesn't understand that the kind of customer purchasing 1-5 Gbps service is probably the kind of customer
   who probably doesn't want an all-in-one device