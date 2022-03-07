---
title: Running a qbittorrent webserver!
description: My experience with a qbittorrent webserver
img: /images/qbittorrent-web.png
alt: running bittorrent webserver
writer: juls07
tags:
  - Linux
  - Bittorrent
  - Docker
  - Web server
---
Recently, I started running a qbittorrent webserver on my raspberry pi 4B+ using [this docker image](https://hotio.dev/containers/qbittorrent/), It has been quite a journey. First, I started looking for a way to run a qbittorrent in a container, this is how I run all the applications on my raspberry pi and I inevibly asked in the [Arch linux discord server](https://discord.gg/3m6dbPR) and I got a reply from @runsamok on discord and they reccomend the docker image I mentioned earlier. Then I started seeding linux distros (obviously) and I started with a batch of about 7 give or take, Ubuntu 18.04, Ubuntu 20.04, Ubuntu 21.04, Arch Linux (duh), Rocky Linux, and tails linux. I shotly realized that Rocky and tails are baren wastelands when it comes to people wanting to torrent them so I eventually Scrapped them.
<br class="article"/>
So after about 10 or so days I wanted to automatically download Arch linux and ubuntu updates using RSS, the qbittorrent webserver has thought of that so you can easily so so in the RSS tab. However, When downloading the latest Arch Linux version it worked fine but I added an ubuntu feed that I accidentally downloaded the 10 most recent torrents, but I deleted them and moved on. Later down the road I was trying to download the march patch of the Arch Linux torrent but I could not, after a while of wondering why I realized my storage was full, my raspberry pi doesnt have a lot of storage but not a little, it turns out that the torrents I deleted from the Ubuntu RSS were still on the raspberry pi, this isnt the fault of the developers because I didnt check the "delete on disk" button but there was not "not enough space warning" message when I tried to download the Arch Linux torrent.
<br class="article"/>
Finally, after everything you're probably asking yourself if you should also host a bittorrent server, you should just as long as you have the free bandwidth and some extra computing power available. The Docker image I choose only takes about 30% cpu max so if you have a raspberry pi laying around it might be the perfect time to setup a bittorrent server. Thanks for reading if you havent already go ahead and follow my twitter [@julie4055_](https://twitter.com/julie4055_) and that'll be it have a great rest of your day!
