---
title: How I made my site fast
description: How I made my social media site fast
img: /images/how-i-made-my-site-fast.png
alt: how i made snowball fast
writer: juls07
pubdate: 22 May, 2022
tags:
  - web dev
  - fullstack development
  - angular
  - nodejs
  - redis
---
So yesterday I talked about my social media site that I'm working on. Today I implemented redis, a memory store that I used to reduce requests at most by 48ms. First when I tried to use redis I just used the `redis` package off of npmjs because it only makes sense but when I tried to get a key with the name of `user-cache-[userId]` It failed for some reason, I still dont know why it failed but using the `ioredis` package and everything started working, not user data processing, what I used redis to cache since it's a terrible for loop that executes database requests for every post, but now it's all stored in memory. I still want to add TTL since my VPS that I intend on deploying my site on for production only has 1GB of RAM but I'm not sure how to do that. If you saw my blog post from [yesterday](/blog/what-ive-been-doing) then you'll know what my user code used to look like, now it looks like this.

```js[post.js]
for (let i = 0; i < replies.length; i++) {
    await redisClient.get('cache-user-' + replies[i].creator, (err, reply) => {
        if (reply == null || err) {
            usermodel.findById(replies[i].creator, '-password -__v -email', async function(err, user) {
                if (err) {
                    return res.status(500).json({
                        message: "Fetching posts failed"
                    });
                }
                replies[i].creator = user;
                redisClient.set('cache-user-' + replies[i].creator._id, JSON.stringify(user))
            })
        } else {
            replies[i].creator = JSON.parse(reply)
        }
    })
    if (i === replies.length - 1) {
        return res.status(200).json({
            message: "replies fetched successfully",
            replies: await replies
        });
    }
}
```

With this you can see first it checks for the user data in cache if there is nonde then it will grab the data from mongodb and then write it to the redis cache. Next time, I want to cache replies and posts but I'm still worried about memory constraint on my VPS. After all of the redis caching I still want to speed up my site more, I want to replace JWT because I dont like it that much and I still want to find a workaround to Opengraph tags. After everything If you want to hear about it more often follow me on [@julie4055_](https://twitter.com/julie4055_), I'm also thinking about writing a blog daily-ish rather than just posting every other month or so, and that'll be it have a great rest of your day!
