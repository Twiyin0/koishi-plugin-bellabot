import { Context, Schema, h, Random, Logger } from 'koishi'

export const name = 'bellabot-interaction'

// const logger = new Logger(name);

const imgSourceApi = 'https://cdn.jsdelivr.net/gh/Twiyin0/cdnsource/json/result_'
const resourceUrl = "https://cdn.jsdelivr.net/gh/Twiyin0/cdnsource/img/bella/";
const mediaUrl = 'https://cdn.jsdelivr.net/gh/Twiyin0/cdnsource/img/bella//mp3/';

export interface Config {
    'bellabot-interaction': boolean
}

export const Config: Schema<Config> = Schema.object({
    'bellabot-interaction': Schema.boolean().default(true)
})

export function apply(ctx: Context, config:Config) {if(config['bellabot-interaction']){
    var audios = ['%E8%80%81%E5%A9%86%E8%80%81%E5%A9%86%E8%80%81%E5%A9%86.mp3','%E8%80%81%E5%85%AC%E8%80%81%E5%85%AC%E8%80%81%E5%85%AC.mp3','%E7%94%B5%E4%BB%96%E7%89%9B%E5%AD%90%EF%BC%81.mp3']
    var images = ["{766E8262-D758-4c73-8B3D-7642AC7CCAD8}.png",'{766E8262-D758-4c73-8B3D-7642AC7CCAD8}.png','2892472967c9e1ae44127ae7c6adc53c.jpg','02dfd6f4be79aabb050e8762ba085186.jpg','0d67b7cc429ef74c2300459a0fef18b6.png','-2a7d27ee401a0027.jpg',"-2e240708f9260f08.jpg", "-5f067349ef15d73a.jpg", "-6da24123689ca9b7.jpg", "-33f06a0374b702.jpg", "-75c9290aae88b9f7.jpg", "-337681a405cbe9f4.jpg"]

    ctx.command("一图 <type>", "涩图发送器！！").alias("img")
    .usage("img <type> type=0,1,2 || 横屏，竖屏，其他")
    .action(async (_,type) => {
        const imgType = ["acc","ver","other","横屏","竖屏","其他"]
        let urlPath = (imgType[Number("awa")%3]!=undefined)? imgType[Number("awa")%3]:imgType.indexOf(type) != -1? imgType[imgType.indexOf(type)%3]:undefined;
        try {
            urlPath = urlPath? urlPath:imgType[Random.int(0,2)];
            console.log(imgSourceApi+urlPath)
            const resData = await ctx.http.get(imgSourceApi+urlPath+".json");
            const imgUrl:any = Random.pick(resData);
            let orgUrl = imgUrl.illust.meta_pages;
            return <>
            Title: {imgUrl.illust.title}&#10;
            PID: {imgUrl.illust.id}&#10;
            画师: {imgUrl.illust.user.name}({imgUrl.illust.user.id})
            <image url={(orgUrl[0]? (Random.pick(orgUrl) as any).image_urls.medium : imgUrl.illust.image_urls.medium).replace('i.pximg.net', 'i.pixiv.re')} />
            原图Url: {(orgUrl[0]? (Random.pick(orgUrl) as any).image_urls.original :imgUrl.illust.meta_single_page.original_image_url).replace('i.pximg.net', 'i.pixiv.re')}
            </>
        } catch (err) {
            console.error(err);
            return <>无法连接至jsdelivr....</>
        }
    })

    ctx.command("一言", "随机一言")
    .action(async () => {
        const textAll = await ctx.http.get("https://cdn.jsdelivr.net/gh/Twiyin0/cdnsource/asign.txt")
        const textArr = textAll.toString().split('\n');
        return <>{Random.pick(textArr)}</>
    })

    ctx.command("猫猫", "随机一只猫猫或者不是猫猫")
    .action(async () => {
        const textAll = await ctx.http.get("https://cdn.jsdelivr.net/gh/Twiyin0/cdnsource/img/neko/filedata.json")
        return <image url={"https://cdn.jsdelivr.net/gh/Twiyin0/cdnsource/img/neko/"+Random.pick(textAll.data.filenames)} />
    })

    ctx.command("贝拉", "召唤贝拉")
    .action(async () => {
        var txtarr = ['怎么了嘛','应召而来','叫贝拉什么事啦','嗯嗯，好，知道了','啊！？','你干嘛~哎哟~','贝拉不在','麻麻生的','好啦好啦，不要再叫啦'];
        var imgarr = ['-1fad13026497291d.jpg','-4d1f6de7eb64ec06.jpg','-5c0b7575e1db2ae5.jpg','-6da24123689ca9b7.jpg',
        '-7826353a22e1ca44.jpg','7c06323573c03d0b.jpg','-4aba7388ceba67c3.jpg','-5a045587fc2adaf2.jpg','QQ%E5%9B%BE%E7%89%8720230414130134.jpg',
        'QQ%E5%9B%BE%E7%89%8720230414130154.jpg','QQ%E5%9B%BE%E7%89%8720230414130228.jpg','QQ%E5%9B%BE%E7%89%8720210920225332.jpg'];
        var rdmarr = [<>在下贝拉，阁下吃了嘛，没吃吃我一拳！！<image url={resourceUrl+"1672677378122(1).jpg"} /></>,<image url={resourceUrl+"34a4284443a9822653b1bfe4cf82b9014b90eb60.jpg"} />,<>你把我召唤出来了, 要v我50才能回去!
                    <image url={resourceUrl+"1672677367060.png"} /></>,<>嗨~是想我了么w
                    <image url={resourceUrl+"36500a1b36b5eaf0edca53f3078088cba372e565.jpg"} /></>,<>是有什么事嘛
                    <image url={resourceUrl+'4e76128258b9f4cad44531b2ee2cffc5fadff6b0.jpg'} /></>,<>美好的一天，要从美妙的邂逅开始~
                    <image url={resourceUrl+'4f37cc50a217fa04.jpg'} /></>];
        return <>{Random.bool(0.5)? Random.pick(rdmarr):<>{Random.pick(txtarr)}<image url={resourceUrl+Random.pick(imgarr)} /></>}</>
    })

    ctx.on('message',async (session) => {
        if (session.content.includes("老婆")) {
          session.send(Random.bool(0.5)?  <audio url={mediaUrl+Random.pick(audios)} />: <image url={resourceUrl+Random.pick(images)} />)
        }
        if (session.content.match(/(色色|瑟瑟|涩涩)/g)) {
            var txtarr1 = ['眼泪滴，不掉；涩涩滴，不要！','涩涩！','涩涩打咩~','打咩嘚嘶，牡蛎嘚嘶!','不可以涩涩！'];
            var rslt1 = ['-1b7dbb6fe80d42e.gif','-5a045587fc2adaf2.jpg','-5ba09fe53cbda336.jpg','-5cfb038737fd80ce.jpg','-7c898f9ca53577ae.jpg','-23bf3edcef075ffa.jpg','-35d44ad8bb0800e.jpg','-41001f90a7ae7835.jpg','5f608987b023f5cc.jpg',"62137efd6809115c6b85bb697cee49b3.gif"];
            session.send(<>{Random.pick(txtarr1)}<image url={resourceUrl+Random.pick(rslt1)} /></>)
        }
        if(session.content.includes("晚安")) {
            var txtarr = ['晚安哦','一起睡觉觉~','快睡觉觉啦~','晚安~','晚安安~'];
            var rslt = ['-2550caef3f27792f.jpg','-5148d3074c517a8d.jpg','2e28fdeb0fc2796a.jpg','-cc39ae6ac099f09.jpg','6dea8c551aad32a4.jpg','632696ab894d5e61.gif','1672677355066.png'];
            session.send(<>{Random.pick(txtarr)}<image url={resourceUrl+Random.pick(rslt)} /></>)
        }
        if(session.content.includes("老婆")) {
            var audios = ['%E8%80%81%E5%A9%86%E8%80%81%E5%A9%86%E8%80%81%E5%A9%86.mp3','%E8%80%81%E5%85%AC%E8%80%81%E5%85%AC%E8%80%81%E5%85%AC.mp3','%E7%94%B5%E4%BB%96%E7%89%9B%E5%AD%90%EF%BC%81.mp3']
            var images = ["{766E8262-D758-4c73-8B3D-7642AC7CCAD8}.png",'{766E8262-D758-4c73-8B3D-7642AC7CCAD8}.png','2892472967c9e1ae44127ae7c6adc53c.jpg','02dfd6f4be79aabb050e8762ba085186.jpg','0d67b7cc429ef74c2300459a0fef18b6.png','-2a7d27ee401a0027.jpg',"-2e240708f9260f08.jpg", "-5f067349ef15d73a.jpg", "-6da24123689ca9b7.jpg", "-33f06a0374b702.jpg", "-75c9290aae88b9f7.jpg", "-337681a405cbe9f4.jpg"]
            return Random.bool(0.5)?  <audio url={mediaUrl+Random.pick(audios)} />: <image url={resourceUrl+Random.pick(images)} />;
        }
        if (session.content.includes('受不了')) {
            session.sendQueued('受不了那就攻起来',800);
            session.sendQueued('哪有压迫,哪就有反抗ᕙ(`▿´)ᕗ',300);
        }
        if (session.content.includes('娘子')) {
            session.send("啊哈~");
        }
        if (session.content.includes("贝拉唱歌")) {
          session.send(<random>
              <><audio url='https://cdn.jsdelivr.net/gh/Twiyin0/cdnsource/img/bella/mp3/%E3%80%8A%E7%88%B1%E6%B2%B3%E3%80%8B.mp3'/></>
              <><audio url='https://cdn.jsdelivr.net/gh/Twiyin0/cdnsource/img/bella/mp3/%E5%BD%93%E5%BD%93%E5%BD%93%E5%BD%93%E5%BD%93%E5%BD%93%E5%BD%93~.mp3'/></>
              <><audio url='https://cdn.jsdelivr.net/gh/Twiyin0/cdnsource/img/bella/mp3/DJ%EF%BC%8C%E6%8D%A2%E6%AD%8C.mp3'/></>
              <><audio url='https://cdn.jsdelivr.net/gh/Twiyin0/cdnsource/img/bella/mp3/mnk%E9%A6%96%E6%92%AD%E7%94%9F%E6%97%A5%E6%AD%8C.mp3'/></>
            </random>)
        }
        if (session.content.match(/^(早|早上好)$/gi)) {
            session.send(<random>
            <>早上好~<image url={resourceUrl+"196653675F85648FE2B20C8F9495DB9D_0.jpg"} /></>
            <>早喵~<image url={resourceUrl+"-1fad13026497291d.jpg"}/></>
            <>早早~<image url={resourceUrl+"1672551585310.png"}/></>
            <>美好的一天要从美妙的邂逅开始~<image url={resourceUrl+"-40f30fa297e3a671.jpg"}/></>
            <>早啊~昨晚睡得舒服嘛<image url={resourceUrl+"-557164c9f74b0b1a.jpg"}/></>
            <>早八人早八魂~<image url={resourceUrl+"1900bd28998944a6.jpg"}/></>
            </random>);
        }
    })
}}
