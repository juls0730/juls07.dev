---
title: What I've been doing
description: Stuff I've been doing recently
img: /images/what-ive-been-doing.png
alt: what ive been doing
writer: juls07
pubdate: 21 May, 2022
tags:
  - web dev
  - fullstack development
  - angular
  - nodejs
  - mongodb
---

So I have been working on a social media site I am currently calling snowballsocial, so far I have users, posts, replies, and likes. Expressjs not having HTTP/2 is slightly annoying and I have kind of thought migrating all of my code to hapi but I'm too lazy to migrate all my code right now, especially since I just "asyncified" it, remaking my code rather than making all new code would probably be easier but I'll do that later. This project I again used mongoDB, I fist used mongodb in my [vuefullstack](https://github.com/juls0730/vuefullstack) app, and I loved it, it's much easier for the kind of projects I use than mySQL. Actually targeting a production site rather than just having fun like with my vuefullstack app or my rails-forum, etc. make me worry about alot more thigs like SEO, I tried to add OG tags to the post-show tag just showing post data but it doesnt work because the tags are added after the data loads.
<br class="article"/>
I've gotten a VPS from [linode](linode.com) so I could expose my non-static only page to the internet without exposing my home IP address, making me vulnerable to being doxxed and DDoS attacks. Using nignx I have reverse-proxied my api from port 3001 to 2087, and added ssl certs, and I have used it to server my static site on port 80, I have used nginx before and it's pretty simple to use. Optimizing has been the bain of development so far, making api requests faster, and reducing bundle size, I'm going to focus on api optimizations since its the harder one. My main worry for more than a couple requests is getting posts, since I do a for loop to change userId's to usernames
```
for (let i = 0; i < posts.length; i++) {
                usermodel.findById(posts[i].creator, '-password -__v -followers -following -email', async function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            message: "Fetching posts failed"
                        });
                    }
                    posts[i].creator = user;
                    if (i === posts.length - 1) {
                        return res.status(200).json({
                            message: "Posts fetched successfully",
                            posts: await posts,
                            maxPosts: await maxPosts
                        });
                    }
                })
            }
```
seen here is the code to change the userId's in get `/api/posts` so making at most 15 database requests per request, maybe a caching solution like redis might be applicable but I have never used something like that but I think I will definitely deploy something like that for caching. After everything If you want to hear about it more often follow me on [@julie4055_](https://twitter.com/julie4055_) and that'll be it have a great rest of your day!