import { Context, Schema, Logger } from 'koishi'

const aidGroupMap: Map<string, Set<string>> = new Map(); // 使用 Map 来记录每个群组已解析的 aid

export class biliLinkAnalysis {
    public ctx:Context;
    constructor(context:Context, maxLength: number) {
        this.ctx = context;
        this.ctx.on('message', async (session) => {
            const VIDEO_REGEX = /(((https?:\/\/)?(www\.|m\.)?bilibili\.com\/(video\/)?)?((av|AV)(\d+)|((BV|bv)1[1-9A-NP-Za-km-z]{9})))/;
            const B23_REGEX = /((https?:\/\/)?(b23\.tv|bili2233\.cn)\/(((av|ep|ss)\d+)|BV1[1-9A-NP-Za-km-z]{9}|\S{6,7}))/;
        
            const video_hashead = /(https?:\/\/)?(www\.)?bilibili\.com\/video\//;
            const b23_hashead = /(https?:\/\/)?(b23\.tv|bili2233\.cn)/;
            const content = session.content.toString();
            let match: any; // 匹配变量声明在循环外部
            let regexs = [/<img.*src=.*\/>/gi,/<audio.*url=.*\/>/gi,/<file.*url=.*\/>/gi,/<image.*url=.*\/>/gi,]
            if (!this.checkStringAgainstRegexes(session.content, regexs))
              while ((match = VIDEO_REGEX.exec(content)) !== null || (match = B23_REGEX.exec(content)) !== null) {
                if (!match) {
                  break; // 如果匹配失败，退出循环
                }
                const link = match[0];
                const groupID = session.event.channel.id.toString();
                const aidSet = aidGroupMap.get(groupID) || new Set();
                try {
                  let matchLong = /(((av|ep|ss)\d+)|BV1[1-9A-NP-Za-km-z]{9}|\S{6,7})/;
                  let data: any = await this.analysisUrl(link.match(video_hashead)? link:link.match(b23_hashead)? link: link.match(matchLong)? 'https://b23.tv/'+link:'https://bilibili.com/video/'+link, this.ctx);
                  const aid = data.videoData.aid.toString();
                  // 判断在当前群组中是否已解析过该视频的 aid
                  if (aidSet.has(aid)) {
                    session.send('该链接已被解析……');
                    break; // 已解析过，直接进入下一个匹配项的处理
                  }
                  // 记录当前群组已解析的 aid
                  aidSet.add(aid);
                  aidGroupMap.set(groupID, aidSet);
                  const title = `${data.videoData.title}(https://bilibili.com/video/av${data.videoData.aid} )`;
                  const picurl = data.videoData.pic;
                  const desc = data.videoData.desc ? (data.videoData.desc.length > maxLength ? `${data.videoData.desc.slice(0, maxLength-5)}...more` : data.videoData.desc) : '这个作者很懒，没有写简介';
                  await session.send(<>{title}<image url={picurl}/>{desc}</>);
                  // 处理完第一个匹配项后退出循环
                  break;
                } catch (err) {
                  session.send('视频解析发生错误……');
                  break; // 跳过axios返回报错就break跳出循环
                }
            }
        })
    }

    async analysisUrl(url:string, ctx:Context) {
        const videoDataRegex = /<script>window\.__INITIAL_STATE__=(.*);\(function\(\)\{var s;\(s=document.currentScript\|\|document.scripts\[document.scripts.length-1\]\)\.parentNode\.removeChild\(s\);\}\(\)\);<\/script>/gi;
        return new Promise(async (resolve, reject) => {
            try {
              let res = await ctx.http.axios(url);
              let videoJson = JSON.parse(res.data.toString().match(videoDataRegex)[0].replace('<script>window.__INITIAL_STATE__=','').replace(';(function(){var s;(s=document.currentScript||document.scripts[document.scripts.length-1]).parentNode.removeChild(s);}());</script>',''))
              resolve(videoJson);
              // console.log(`[title]${videoJson.videoData.title}(avid: ${videoJson.aid})\n \
              // [picurl]${videoJson.videoData.pic}\n \
              // [desc]${videoJson.videoData.desc}`)
              return videoJson;
            } catch (error) {
              reject(error);
              throw error;
            }
        })
    }
      
    checkStringAgainstRegexes(str: string, regexArray:any) {
    for (let regex of regexArray) {
        if (regex.test(str)) {
            return true; // 如果有任何一个正则表达式匹配，则返回true
        }
    }
    return false; // 如果没有任何一个正则表达式匹配，则返回false
    }
}
