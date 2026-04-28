/**
 * pageData 数据文件
 * 从 js/home.js 中分离出来，保持静态数据与渲染逻辑分离。
 */
const pageData = {
    hotItems: [
        { href: "//www.woyzy.com", img: "images/1.png", desc: "我要资源网" },
        { href: "//bangumi.tv/", img: "images/2.png", desc: "番组计划" },
        { href: "//www.bilibili.com/", img: "images/3.png", desc: "哔哩哔哩" },
        { href: "//bcy.net/", img: "images/4.png", desc: "半次元" },
        { href: "//moe.fm/", img: "images/7.png", desc: "萌否电台" },
        { href: "//zh.moegirl.org/", img: "images/8.png", desc: "萌娘百科" },
        { href: "//gacha.163.com/", img: "images/5gacha.png", desc: "GACHA" },
        { href: "//www.u17.com/", img: "images/9.png", desc: "有妖气" },
        { href: "//www.pixiv.net/", img: "images/10.png", desc: "Pixiv" },
        { href: "//www.acfun.cn/", img: "images/11.png", desc: "AcFun" },
        { href: "//www.littlemusic.tv/", img: "images/13.png", desc: "LM音乐" }
    ],
    mainItems: [
        ["//www.baidu.com/", "百度", "//tieba.baidu.com/", "贴吧"],
        ["//www.163.com/", "网易", "//email.163.com/", "邮箱"],
        ["//www.sina.com.cn/", "新浪", "//www.weibo.com/", "微博"],
        ["//www.taobao.com/", "淘宝", "//www.tmall.com/", "天猫"],
        ["//www.qq.com/", "腾讯", "//qzone.qq.com/", "空间"],
        ["//www.douban.com/", "豆瓣", "//movie.douban.com/", "电影"],
        ["//www.xiami.com/", "虾米"],
        ["//www.tudou.com/", "土豆"],
        ["//www.youku.com/", "优酷"],
        ["//www.letv.com/", "乐视"],
        ["//www.iqiyi.com/", "爱奇艺"],
        ["//bbs.tianya.cn/", "天涯社区"],
        ["//www.zhihu.com/", "知乎"],
        ["//www.jd.com/", "京东"],
        ["//www.amazon.cn/", "亚马逊"],
        ["//www.sohu.com/", "搜狐"],
        ["//sh.58.com/", "58同城"],
        ["//www.ganji.com/", "赶集网"]
    ],
    nonmainItems: [
        { href: "//www.bilibili.com/", text: "哔哩哔哩" },
        { href: "//www.acfun.tv/", text: "Acfun" },
        { href: "//www.u17.com/", text: "有妖气" },
        { href: "//www.woyzy.com/", text: "提莫博客" },
        { href: "//zh.moegirl.org/", text: "萌娘百科" },
        { href: "//moe.fm/", text: "萌否电台" },
        { href: "//www.tgbus.com/", text: "电玩巴士" },
        { href: "//www.gamersky.com/", text: "游民星空" },
        { href: "//www.wandoujia.com/apps", text: "豌豆荚" },
        { href: "//www.030buy.com/", text: "萌购代购" },
        { href: "//gacha.163.com/", text: "Gacha" },
        { href: "//www.hexieshe.com/", text: "和邪社" },
        { href: "//www.modian.com/", text: "摩点众筹" },
        { href: "//bbs.comicdd.com/", text: "动漫东东" },
        { href: "//bcy.net/", text: "半次元" },
        { href: "//acg.shunwang.com/", text: "顺网ACG" },
        { href: "//juju.la/", text: "JUJU" },
        { href: "//www.woyzy.com/", text: "我要资源网" }
    ],
    carouselItems: [
        { href: "//space.bilibili.com/15625440", img: "//i2.hdslb.com/bfs/archive/e882ef9e3b5618c7ceeeec8dbdd6de38c4f5bff7.jpg@672w_378h_1c.webp" },
        { href: "//www.bilibili.com/topic/852.html", img: "//i2.hdslb.com/bfs/archive/01fc045d89938de8d2bf678315db1afdf06e5a4a.jpg@672w_378h_1c.webp" }
    ],
    pageLinkSections: [
        {
                    title: "弹幕",
                    items: [
                        {
                                            href: "//www.bilibili.com/",
                                            title: "哔哩哔哩",
                                            desc: "bilibili是中国大陆一个动画、游戏相关的弹幕视频分享网站，也被称为哔哩哔哩、B站。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.acfun.cn/",
                                            title: "AcFun",
                                            desc: "AcFun是中国大陆的一家主要关于动画、游戏的弹幕式视频分享网站。AcFun取意于Anime Comic Fun。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.nicovideo.jp/",
                                            title: "Nico动画",
                                            desc: "NICONICO动画是NIWANGO公司所提供的线上影片分享网站，常被简称为niconico或nico等。与YouTube等线上影片网站相似。",
                                            isShort: true
                                        },
                        {
                                            href: "//bangumi.tv/",
                                            title: "番组计划",
                                            desc: "专注于动漫、音乐、游戏领域，帮助你分享、发现与结识同好的ACG网络",
                                            isShort: true
                                        },
                        {
                                            href: "//luxun.pro/",
                                            title: "鲁迅追番",
                                            desc: "鲁迅追番是一款简单易用的追番工具，在鲁迅追番可以追番、看番、评番，追番如此简单。",
                                            isShort: true
                                        },
                        {
                                            href: "//cartoon.tudou.com/",
                                            title: "土豆动漫",
                                            desc: "土豆动漫。",
                                            isShort: true
                                        },
                        {
                                            href: "//comic.youku.com/",
                                            title: "优酷动漫",
                                            desc: "优酷动漫频道-中国高清版权动画网站，经典新番热播。",
                                            isShort: false
                                        },
                        {
                                            href: "//comic.letv.com/",
                                            title: "乐视动漫",
                                            desc: "乐视动漫频道为您提供国内外最新最火爆的动漫视频。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.iqiyi.com/dongman/",
                                            title: "爱奇艺动漫",
                                            desc: "最新热播的动漫视频都将在这里一一呈现。悦奇艺，享动漫，欢迎来到奇艺动漫！",
                                            isShort: false
                                        },
                        {
                                            href: "//tv.sohu.com/comic/",
                                            title: "搜狐动漫",
                                            desc: "搜狐视频动漫频道。",
                                            isShort: false
                                        },
                        {
                                            href: "//v.qq.com/cartoon/",
                                            title: "腾讯视频の动漫",
                                            desc: "腾讯视频动漫频道，国内国外新番，正版授权。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.ibilibili.com/",
                                            title: "爱哔哩",
                                            desc: "网站着重于哔哩哔哩相关服务的辅助功能，提供热门视频度盘下载功能。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.bilibilijj.com/",
                                            title: "哔哩哔哩唧唧",
                                            desc: "哔哩哔哩唧唧。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.lamian.tv/",
                                            title: "拉面",
                                            desc: "拉面原创--因为有爱，所以用心的ACG视频弹幕网站，简称\"L站\"。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.005.tv/",
                                            title: "羁绊网",
                                            desc: "力求做真正的二次元动漫平台，为梦想而战斗。这便是动漫与你之间的羁绊。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.998dm.com",
                                            title: "998动漫",
                                            desc: "998动漫 最新的动漫在线观看平台 已经添加贵站 友情链接了 请审核",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 2,
                    title: "萌音",
                    items: [
                        {
                                            href: "//moe.fm/",
                                            title: "萌否电台",
                                            desc: "社会化ACG音乐电台。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.missevan.cn/",
                                            title: "弹幕音频M站",
                                            desc: "M站是第一家弹幕音图站,同时也是中国声优基地,在这里可以听电台,音乐,翻唱,小说和广播剧,用二次元声音连接三次元。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.xiami.com/",
                                            title: "虾米音乐",
                                            desc: "提供高品质音乐MP3的个性化推荐、发布、P2P下载服务，以及线下音乐活动等互动内容",
                                            isShort: true
                                        },
                        {
                                            href: "//douban.fm/",
                                            title: "豆瓣电台",
                                            desc: "豆瓣FM是你专属的个性化音乐收听工具。它简单方便，打开就能收听。",
                                            isShort: true
                                        },
                        {
                                            href: "//moesound.com/",
                                            title: "萌音ACG",
                                            desc: "提供动漫音乐服务。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.kuwo.cn/",
                                            title: "酷我音乐",
                                            desc: "在线正版音乐网站,酷我音乐网提供免费在线音乐试听、高音质正版音乐下载和MV播放等服务。",
                                            isShort: true
                                        },
                        {
                                            href: "//y.qq.com/",
                                            title: "QQ音乐",
                                            desc: "QQ音乐是腾讯公司推出的一款免费音乐服务，海量乐库在线试听、最流行新歌在线首发、歌词翻译。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.zhaiin.com/",
                                            title: "宅音",
                                            desc: "一个ACG类的在线音乐试听分享网站",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 3,
                    title: "字幕组",
                    items: [
                        {
                                            href: "//www.kamigami.org/",
                                            title: "诸神字幕组",
                                            desc: "字幕组。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.sosg.net/",
                                            title: "SOSG字幕组",
                                            desc: "字幕组。",
                                            isShort: true
                                        },
                        {
                                            href: "https://www.airota.net/",
                                            title: "千夏字幕组",
                                            desc: "千夏町是千夏字幕组的官方论坛。",
                                            isShort: true
                                        },
                        {
                                            href: "https://bbs.popgo.org/",
                                            title: "漫游字幕组",
                                            desc: "字幕组。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.doujinanime.com/",
                                            title: "DA同音爱漫",
                                            desc: "字幕组。",
                                            isShort: true
                                        }
                    ]
                },
        {
                    id: 4,
                    title: "直播",
                    items: [
                        {
                                            href: "//www.douyutv.com/",
                                            title: "斗鱼TV",
                                            desc: "斗鱼-全民游戏直播平台提供高清、快捷、流畅的视频直播和游戏赛事直播服务。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.huya.com/",
                                            title: "虎牙直播",
                                            desc: "虎牙直播是第一游戏直播互动平台,900万人同时在线,提供高清、流畅的赛事直播和游戏直播.",
                                            isShort: true
                                        },
                        {
                                            href: "//live.bilibili.com/",
                                            title: "哔哩哔哩直播",
                                            desc: "哔哩哔哩直播是国内首家关注ACG直播的互动平台。它不一定最宅，但一定宅得最萌；不一定最污，但是一定污得最优雅。",
                                            isShort: true
                                        },
                        {
                                            href: "//longzhu.com/",
                                            title: "龙珠直播",
                                            desc: "龙珠直播,TGA直播-最全的赛事直播,最丰富的游戏视频互动平台。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.panda.tv/",
                                            title: "熊猫TV",
                                            desc: "熊猫TV提供高清流畅的视频、活动、赛事直播服务，包含英雄联盟lol、炉石传说、dota2直播等游戏直播，内容丰富。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.zhanqi.tv/",
                                            title: "战旗TV",
                                            desc: "战旗TV游戏直播平台提供高清、流畅的视频直播和电子竞技游戏直播。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.huomao.com/",
                                            title: "火猫TV",
                                            desc: "火猫TV直播为您提供高清超清原码的畅快直播体验和独家赛事直播服务。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.quanmin.tv/",
                                            title: "全民TV",
                                            desc: "全民TV，开启全民直播时代。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.twitch.tv/",
                                            title: "Twitch",
                                            desc: "直播、交流。",
                                            isShort: false
                                        },
                        {
                                            href: "//v.17173.com/live/",
                                            title: "17173游戏直播",
                                            desc: "17173游戏直播提供实时、流畅、清晰、便捷的游戏赛事直播服务。",
                                            isShort: false
                                        },
                        {
                                            href: "//kan.sina.com.cn/",
                                            title: "新浪看游戏",
                                            desc: "新浪看游戏致力于打造中国最专业的游戏直播平台，为玩家提供实时，高清，便捷的游戏视频直播和赛事直播服务。",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 5,
                    title: "资讯",
                    items: [
                        {
                                            href: "//www.dannychoo.com/",
                                            title: "日本文化",
                                            desc: "二次元资讯。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.acgdoge.net/",
                                            title: "Acgdoge",
                                            desc: "谈天论地涨姿势。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.avgchannel.com/",
                                            title: "AVG资讯频道",
                                            desc: "面向国内动画视效游戏从业人员及爱好者的新型资讯门户网站，旨在为用户提供动画、影视特效和游戏领域及时专业权威全面的行业资讯。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.eroacg.com/",
                                            title: "工口ACG",
                                            desc: "工口ACG（EroACG）是一个主要介绍日本画师以及相关动漫资讯的网站。网站以文章为主，并向大家推荐有趣有爱的动漫作品。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.cxacg.com/",
                                            title: "橙心社",
                                            desc: "橙心社-诚心制作每一期动漫节目",
                                            isShort: true
                                        },
                        {
                                            href: "//news.missevan.cn/",
                                            title: "M站",
                                            desc: "M站给您提供最快的动漫新闻资讯,动漫新番情报,讨论气氛浓厚,话题丰富,努力打造最好的动漫新闻平台",
                                            isShort: true
                                        },
                        {
                                            href: "//www.butongshe.com/",
                                            title: "钚同社",
                                            desc: "聊新番动画，欣赏同人插画，吐槽国内外二次元新鲜事",
                                            isShort: false
                                        },
                        {
                                            href: "//acg.17173.com/",
                                            title: "17173动漫频道",
                                            desc: "二次元资讯。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.jpbeta.net/",
                                            title: "Jpbeta",
                                            desc: "一个以日本文化、日本动漫、日本游戏、日本美食、日本科技、日本影视为主的博客网站。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.gxdmw.com/",
                                            title: "高校动漫",
                                            desc: "高校动漫联盟。",
                                            isShort: false
                                        },
                        {
                                            href: "//acg.shunwang.com/",
                                            title: "顺网ACG",
                                            desc: "顺网动漫频道拥有动漫新闻和资讯，声优、手办、周边、cosplay情报。同时拥有最新在线动画、在线漫画观看",
                                            isShort: false
                                        },
                        {
                                            href: "//www.yimoe.cc",
                                            title: "翼萌动漫",
                                            desc: "ACG领域爱好者的讨论交流字幕组",
                                            isShort: false
                                        },
                        {
                                            href: "//www.comicst.com/",
                                            title: "漫社堂",
                                            desc: "漫社堂有着最前沿的动漫资讯,有着最丰富的动漫资源,有着最萌喵的动漫文化,是最有爱的动漫宅中心!",
                                            isShort: false
                                        },
                        {
                                            href: "//www.onijiang.com/",
                                            title: "欧尼酱",
                                            desc: "欧尼酱二次元动漫社交平台(O站)",
                                            isShort: false
                                        },
                        {
                                            href: "//www.diyidan.com/",
                                            title: "第一弹",
                                            desc: "覆盖知名动漫游戏作品中最有趣、最有梗、最奇葩、最涨姿势的劲爆内容,基于个性化数据挖掘引擎,专为你定制可能感兴趣的内容。",
                                            isShort: false
                                        },
                        {
                                            href: "//mag.moe/",
                                            title: "卖萌",
                                            desc: "卖萌资讯，卖的一手好萌。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.23ciyuan.com/",
                                            title: "二三次元",
                                            desc: "二三次元-动漫下载|动漫音乐|新番动画下载",
                                            isShort: false
                                        },
                        {
                                            href: "//www.zuiacg.com/",
                                            title: "最ACG",
                                            desc: "最ACG网专注于ACG周边资讯，汇集各类有趣的新闻，网罗各路本子，竭力满足绅士所需。",
                                            isShort: false
                                        },
                        {
                                            href: " //2chcn.com/",
                                            title: "2ch中文网",
                                            desc: "专业搬运日本2ch，日本人的评论以及日本趣闻看这里！2ch翻译看这里！",
                                            isShort: false
                                        },
                        {
                                            href: "//www.acglivefans.com/",
                                            title: "二次元现场",
                                            desc: "二次元线上线下资讯",
                                            isShort: false
                                        },
                        {
                                            href: " //kanquwen.com/",
                                            title: "看趣闻",
                                            desc: "看趣闻专注翻译2ch著名故事，或2ch上的有趣日常帖子。范围从恶搞帖、日常卖蠢、到热点话题应有尽有。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.dmacg.net/",
                                            title: "缘叶二次元",
                                            desc: "缘叶二次元，分享动漫资讯。",
                                            isShort: false
                                        },
                        {
                                            href: "//bbs.zmobuy.com/",
                                            title: "周末动漫社区",
                                            desc: "宅在家里看资讯。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.onlolikon.com",
                                            title: "音域动漫",
                                            desc: "精彩的动漫资讯，好看的壁纸与cosplay，高清的动漫与X物，尽在音域动漫~！",
                                            isShort: false
                                        },
                        {
                                            href: "https://www.g-cores.com/",
                                            title: "机核",
                                            desc: "从游戏到生活，我们生产内容，关乎你喜爱的一切。",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 6,
                    title: "综合",
                    items: [
                        {
                                            href: "//bcy.net/",
                                            title: "半次元",
                                            desc: "提供cosplay、绘画和小说创作发表、二次元同好交流等社群服务。",
                                            isShort: true
                                        },
                        {
                                            href: "//acg.shunwang.com/",
                                            title: "顺网ACG",
                                            desc: "顺网动漫频道拥有动漫新闻和资讯，声优、手办、周边、cosplay情报。同时拥有最新在线动画、在线漫画观看",
                                            isShort: true
                                        },
                        {
                                            href: "//comic.qq.com/",
                                            title: "腾讯动漫",
                                            desc: "腾讯网动漫频道，动漫综合网站。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.moejam.com/",
                                            title: "梦域动漫",
                                            desc: "梦域动漫网为您提供一站式ACG服务新体验。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.5477dm.com/",
                                            title: "一万光年动漫站",
                                            desc: "一万光年动漫电台官方网站。",
                                            isShort: true
                                        },
                        {
                                            href: "//acg.18touch.com/",
                                            title: "萌聚",
                                            desc: "二次元综合网站。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.kou.moe/",
                                            title: "萌口组",
                                            desc: "萌口组|多人创作文艺泛ACG站",
                                            isShort: false
                                        },
                        {
                                            href: "//www.comicdd.com/",
                                            title: "动漫东东",
                                            desc: "动漫东东，系统萌化。",
                                            isShort: false
                                        },
                        {
                                            href: "//gacha.163.com/",
                                            title: "GACHA创作社区",
                                            desc: "GACHA是网易出品的动漫二次元ACG同好社区。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.91dm.cc",
                                            title: "九妖动漫",
                                            desc: "九妖动漫网是一个专注以分享动漫资源共享为主要目标的动漫资源网站简称“Z站”。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.shoku.cn",
                                            title: "触神社",
                                            desc: "触神社是二次元服务型电商平台，你可以在这里免费找到帮手，也可以出售自己的才能。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.ammmi.com",
                                            title: "Ammmi二次元",
                                            desc: "国内COS绘画腐女等二次元综合社区，一个二次元同好用户交流社群。",
                                            isShort: false
                                        },
                        {
                                            href: "https://zhaidianshe.com/",
                                            title: "宅电舍",
                                            desc: "你的二次元买家秀专属APP",
                                            isShort: false
                                        },
                        {
                                            href: "//www.zhaicy.com",
                                            title: "宅次元",
                                            desc: "欢迎进入宅领域！",
                                            isShort: false
                                        },
                        {
                                            href: "//moe.005.tv/",
                                            title: "萌娘资源站",
                                            desc: "萌娘资源站为您提供海量萌化资源下载，找资源就上萌娘资源站。",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 7,
                    title: "漫画",
                    items: [
                        {
                                            href: "//ac.qq.com/",
                                            title: "腾讯动漫",
                                            desc: "正版动漫网站，连载众多原创国漫，原创动画，正版日漫等海内外最热正版动漫内容。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.dmzj.com/",
                                            title: "动漫之家",
                                            desc: "专业的在线漫画、原创漫画、最好看的动漫网站，每周更新各种原创漫画、日本动漫。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.u17.com/",
                                            title: "有妖气",
                                            desc: "纯原创漫画网站，数千名中国原创漫画作者汇聚于此，在线连载最热门的全新漫画作品。",
                                            isShort: true
                                        },
                        {
                                            href: "//baozoumanhua.com/",
                                            title: "暴走漫画",
                                            desc: "恶搞漫画社区暴走漫画（暴漫），官方每小时都有更新。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.ishangman.com/",
                                            title: "i尚漫",
                                            desc: "i尚漫中国原创漫画全媒体平台,中国数千优秀原创漫画作者加盟i尚漫。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.ifenghui.com/",
                                            title: "锋绘网",
                                            desc: "专业原创漫画网站，提供最优质的在线漫画阅读服务，云集大批原创漫画作者。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.dmzx.com/",
                                            title: "动漫在线漫画网",
                                            desc: "动漫在线漫画网(DMZX.com)为您提供最新的漫画。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.mkzhan.com/",
                                            title: "漫客栈",
                                            desc: "漫客栈-中国原创在线漫画第一站",
                                            isShort: false
                                        },
                        {
                                            href: "//manhua.weibo.com/",
                                            title: "微漫画",
                                            desc: "漫画,微漫画,这是一个有节操的网站,汇聚优秀中国原创漫画作者。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.webtoons.com/",
                                            title: "Webtoon中文官网",
                                            desc: "全球数字漫画服务平台，Webtoon提供每日更新超过200个在线免费漫画，大量知名韩国条漫收录其中。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.buka.cn/",
                                            title: "布卡漫画",
                                            desc: "漫画APP应用，推荐在移动端打开此页面。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.qingman.cc/",
                                            title: "轻漫画",
                                            desc: "漫画APP应用，推荐在移动端打开此页面。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.muu.com.cn/",
                                            title: "漫悠悠",
                                            desc: "国内条漫知名网站",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 8,
                    title: "绘圈",
                    items: [
                        {
                                            href: "//www.pixiv.net/",
                                            title: "Pixiv",
                                            desc: "日本最大的萌图网站，聚集各种原创、同人绘师触手。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.xieexx.com/",
                                            title: "幻想学院",
                                            desc: "画师交流，绘画交流。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.poocg.com/",
                                            title: "涂鸦王国",
                                            desc: "涂鸦王国，插画网站,是中国优秀的插画师,漫画家,画家的聚集地！",
                                            isShort: true
                                        },
                        {
                                            href: "//huamoe.com/",
                                            title: "画萌网",
                                            desc: "画萌网-综合性画师服务平台，旨在为画师创造更大的价值！",
                                            isShort: true
                                        },
                        {
                                            href: "//h.bilibili.com/",
                                            title: "画友",
                                            desc: "一个简单的原创画画交流中心，bilibili旗下绘画网站。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.heimancc.com/",
                                            title: "嘿漫CC",
                                            desc: "嘿漫CC（HEIMANCC）是建立于2014年的中文绘画爱好者互动交流平台。",
                                            isShort: true
                                        },
                        {
                                            href: "//xiong.ac/",
                                            title: "有熊",
                                            desc: "画师交流，绘画交流。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.pixvi.net/bbs/",
                                            title: "PiBBS",
                                            desc: "小透明绘师的交流与休闲论坛，欢迎各种绘师入住！",
                                            isShort: false
                                        },
                        {
                                            href: "//elfartworld.com/",
                                            title: "Elf Art World",
                                            desc: "为二次元画师以及写手提供交流创作的平台，创作者能够通过自己的原创角色与他人进行交流，并参加企画活动",
                                            isShort: false
                                        },
                        {
                                            href: "//www.udongman.cn/",
                                            title: "优动漫",
                                            desc: "优动漫平台致力于为广大绘画爱好者提供专业的创作支持和帮助。",
                                            isShort: false
                                        },
                        {
                                            href: " //chumengxiang.com",
                                            title: "触梦想",
                                            desc: "触梦想是基于画师养成思维，互联网模式下诞生的线上美术约稿平台。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.fangao.cc/",
                                            title: "饭糕学院",
                                            desc: "大神初养成\n                                                    量产低龄触\n                                                    距离梦想一步之遥",
                                            isShort: false
                                        },
                        {
                                            href: "//www.huiman.net",
                                            title: "汇漫网",
                                            desc: "汇漫网，专业原创动漫设计互动平台。",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 9,
                    title: "萌图",
                    items: [
                        {
                                            href: "//www.apic.in/",
                                            title: "A区",
                                            desc: "A区动漫图站，每天定时更新一系列动漫图片,动漫美女图片,高清动漫图片，Hentai图片，动漫足控图片。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.zerochan.net/",
                                            title: "Zerochan",
                                            desc: "萌图。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.roame.net/",
                                            title: "路游动漫",
                                            desc: "提供动漫高分辨率图片、动漫高清宽屏壁纸免费下载，无水印，支持自助打包，每日更新，并提供图片反向搜索、相似图片搜索功能。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.e-shuushuu.net/",
                                            title: "E-Shuushuu",
                                            desc: "萌图。",
                                            isShort: true
                                        },
                        {
                                            href: "//yuriimg.com/",
                                            title: "百合图片",
                                            desc: "妹子+妹子=更萌",
                                            isShort: true
                                        },
                        {
                                            href: "//zhui.fr/",
                                            title: "ZHUI动漫美女",
                                            desc: "acg社区分享资讯图片为宗旨提供精美动漫美女壁纸桌面图片，日本新番动漫情报，acg情报。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.moehui.com/",
                                            title: "萌绘",
                                            desc: "本站专注收集发布各类日式漫画教程、Q版漫画教程、色铅笔教程、以及各类线稿画集。",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 10,
                    title: "Cosplay",
                    items: [
                        {
                                            href: "//www.cilacila.com/",
                                            title: "C区",
                                            desc: "动漫图片大全,分享二次元动漫图片。",
                                            isShort: true
                                        },
                        {
                                            href: "//bcy.net/coser",
                                            title: "半次元",
                                            desc: "半次元是国内最大的ACG同好社群，汇聚了包括Coser、绘师、写手等创作者在内的众多二次元同好。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.xcos.cc/",
                                            title: "XCOS",
                                            desc: "XCOS.CC是中国大陆一个COSPLAY相关的集媒体、社交、展示、线下活动于一体的专注COSPLAY领域的综合平台。",
                                            isShort: true
                                        },
                        {
                                            href: "//worldcosplay.net/",
                                            title: "WorldCosplay",
                                            desc: "WorldCosplay是一个对全世界Cosplayer开放的网站，欢迎你自由发布Cosplay图像。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.chaonengbu.com",
                                            title: "超能部",
                                            desc: "二次元社团原创精品展示与互动平台。",
                                            isShort: true
                                        },
                        {
                                            href: "//acg.178.com/list/moe/index.html",
                                            title: "178 Cosplay",
                                            desc: "178动漫频道拥有最新动漫新闻和资讯，COSPLAY、手办、游戏及动漫周边情报。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.cosplay8.com/",
                                            title: "Cosplay 8",
                                            desc: "中国Cosplay第一门户,Cosplay中国是国内首家专注于Cosplay资讯新闻的专业门户网站。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.ciyuanfu.com",
                                            title: "次元府",
                                            desc: "次元府,本站长期举办二次元技能比赛,并给获胜者发放现金奖励！",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 11,
                    title: "百科",
                    items: [
                        {
                                            href: "//zh.moegirl.org/",
                                            title: "萌娘百科",
                                            desc: "领先的中文二次元百科网站。",
                                            isShort: true
                                        },
                        {
                                            href: "https://zh.wikipedia.org",
                                            title: "维基百科",
                                            desc: "维基百科，自由的百科全书。",
                                            isShort: true
                                        },
                        {
                                            href: "//baike.baidu.com/",
                                            title: "百度百科",
                                            desc: "百度百科是一部内容开放、自由的网络百科全书。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.guokr.com/",
                                            title: "果壳网",
                                            desc: "果壳网是一个泛科技主题网站，提供负责任、有智趣、贴近生活的内容，你可以在这里阅读、分享、交流、提问",
                                            isShort: true
                                        },
                        {
                                            href: "//www.zhihu.com/",
                                            title: "知乎",
                                            desc: "一个真实的网络问答社区，帮助你寻找答案，分享知识。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.moeask.cn",
                                            title: "萌新问答",
                                            desc: "萌新问答MoeAsk.cn，是一个专注二次元领域的“知乎向“平台。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.miaomiaomiao.org",
                                            title: "喵喵喵博客",
                                            desc: "一个充满了梗的网站",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 12,
                    title: "腐女801",
                    items: [
                        {
                                            href: "//www.acgcp.com/",
                                            title: "萌CP",
                                            desc: "想找各类BL，乙女资源就来萌CP翻翻吧。",
                                            isShort: true
                                        },
                        {
                                            href: "https://www.doufu.la",
                                            title: "豆腐",
                                            desc: "好看的言情耽美小说。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.blnovel.com/",
                                            title: "耽美中文网",
                                            desc: "耽美中文网,免费提供耽美小说,腐向。",
                                            isShort: true
                                        },
                        {
                                            href: "//bbs.empiresdm.com/",
                                            title: "帝国搅基军团",
                                            desc: "本论坛以黑暗，孤独，阴郁，冷傲，邪恶，自由为风格。资源为中心，交流为特色。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.fumanhua.net/",
                                            title: "腐漫画",
                                            desc: "腐女漫画、耽美漫画、最新BL漫画",
                                            isShort: true
                                        },
                        {
                                            href: "//www.fusns.com",
                                            title: "FuSNS腐宅",
                                            desc: "FuSNS腐宅（FuSNS.com）是一个提供耽美资源，BL动画，耽美小说，耽美视频，动漫资源，可腐可萌的腐社区",
                                            isShort: true
                                        }
                    ]
                },
        {
                    id: 13,
                    title: "社区",
                    items: [
                        {
                                            href: "//www.llgkm.com/",
                                            title: "工口喵",
                                            desc: "二次元交流论坛。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.comicst.com/",
                                            title: "漫社堂",
                                            desc: "动漫资讯、动漫论坛。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.hyacg.com/",
                                            title: "HY社区",
                                            desc: "Happy\n                                                    Yooo!社区是一个以分享有爱资源和吐槽为主的ACG综合社区。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.gtloli.com/",
                                            title: "哥特萝莉社",
                                            desc: "哥特萝莉社专业二次元资源分享平台任何人均可提交分享自己的资源是一个人人都能自由交流的分享平台。",
                                            isShort: true
                                        },
                        {
                                            href: "//bbs.jkacg.me/",
                                            title: "JKACG动漫论坛",
                                            desc: "JKACG动漫论坛丨无动漫，不人生！",
                                            isShort: true
                                        },
                        {
                                            href: "https://www.didm.cc/",
                                            title: "嘀动漫",
                                            desc: "嘀动漫是次元宅友分享交流圣殿 积聚 动漫下载 动漫新闻 与一体的动漫分享平台-更多内容尽在嘀动漫",
                                            isShort: true
                                        },
                        {
                                            href: "//mcyacg.com/",
                                            title: "梦次元",
                                            desc: "梦次元是一个以二次元动漫ACG以及相关资源交流分享为主的动漫平台。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.dmdjz.com/",
                                            title: "动漫大家族",
                                            desc: "动漫论坛。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.md521.com/",
                                            title: "萌动王朝",
                                            desc: "论坛、萌图。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.dbacg.com.cn/",
                                            title: "熊爪动漫",
                                            desc: "黑龙江动漫。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.mcpmaid.com/",
                                            title: "MCP女仆文化推广",
                                            desc: "女仆、妹控兴趣交流。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.otomedream.com/",
                                            title: "翼梦舞城",
                                            desc: "翼梦舞城-女性向多多",
                                            isShort: false
                                        },
                        {
                                            href: "//bbs.acg-moe.com/",
                                            title: "御宅同萌",
                                            desc: "团子大家族の御宅同萌",
                                            isShort: false
                                        },
                        {
                                            href: "//www.acgke.com/",
                                            title: "次元客",
                                            desc: "一家ACGN二次元同好社交网站，为二次元爱好者提供资源分享以及二次元文化交流讨论。",
                                            isShort: false
                                        },
                        {
                                            href: " //www.pmxsd.com/",
                                            title: "神奇宝贝新生代",
                                            desc: "以神奇宝贝为话题的精灵宝可梦专题社区",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 14,
                    title: "小说",
                    items: [
                        {
                                            href: "//book.sfacg.com/",
                                            title: "SF轻小说",
                                            desc: "SF轻小说网提供海量日本轻小说,国产轻小说,动漫小说,轻小说TXT下载,轻小说在线阅读,",
                                            isShort: true
                                        },
                        {
                                            href: "//bbs.rpgsky.net/",
                                            title: "幻天小说",
                                            desc: "幻想天空已推动国内游戏发展，ACG交流为主的游戏制作论坛让中国ACG得到更好的发展为目的~",
                                            isShort: true
                                        },
                        {
                                            href: "https://www.bearead.com/",
                                            title: "白熊阅读",
                                            desc: "写你最萌的CP，吃你最爱的粮。无论同人原创、热圈冷圈，我就在这里等你～",
                                            isShort: true
                                        },
                        {
                                            href: " //www.linovel.net/",
                                            title: "轻之文库",
                                            desc: "轻之文库是全球最大的中文轻小说网站,提供独最新最全的轻小说免费阅读和手机在线阅读",
                                            isShort: true
                                        },
                        {
                                            href: "//www.qidian.com/",
                                            title: "起点中文",
                                            desc: "小说阅读,精彩小说尽在起点小说。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.8kana.com/",
                                            title: "不可能の世界",
                                            desc: "小说排行榜,免费小说下载,好看的小说。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.iqing.in/",
                                            title: "轻文轻小说",
                                            desc: "在网络文学的领域，我们更懂二次元，在二次元的世界，我们专注轻小说。",
                                            isShort: false
                                        },
                        {
                                            href: "//hs.vread.com/",
                                            title: "花生故事",
                                            desc: "我们是一个专注二次元轻小说的app，主要面对二次元读者，平台上不仅可以读小说，玩故事-故事接龙。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.qcacg.com",
                                            title: "QC轻小说",
                                            desc: "QC原创轻小说,为二次元提供轻小说投稿与画师约稿相结合的平台。",
                                            isShort: false
                                        },
                        {
                                            href: "https://www.qiaobooks.com/",
                                            title: "巧书",
                                            desc: "巧书，可以自由选择故事剧情的互动小说平台。提供最新最全互动小说及在线编辑器。让二次元文学动起来！",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 15,
                    title: "手办",
                    items: [
                        {
                                            href: "//www.actoys.net/",
                                            title: "AC模玩网",
                                            desc: "AC模玩网(ACTOYS.net)是中文世界最大的动漫周边模型玩具网,也是最大的模型玩具爱好者网络聚集地和最大的玩具交易交流平台。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.toyszine.org/",
                                            title: "玩物尚志",
                                            desc: "用独立专业的态度，专注手办、GK、PVC涂装完成品、扭蛋、盒蛋、景品、人偶、美少女、机械类周边玩具测评。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.aemedia.org/",
                                            title: "Aemedia高达同好",
                                            desc: "高达同好会。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.moxing.net/",
                                            title: "模型网",
                                            desc: "模型,手办。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.xiaot.com/",
                                            title: "XiaoT模型",
                                            desc: "模型,手办。",
                                            isShort: true
                                        },
                        {
                                            href: "//hobby.dengeki.com/",
                                            title: "DHW手办",
                                            desc: "DENGEKI\n                                                    HOBBY\n                                                    WEB 電撃ホビーウェブ",
                                            isShort: true
                                        },
                        {
                                            href: "//www.78dm.net/",
                                            title: "78动漫",
                                            desc: "78动漫模型玩具网，要做最好的动漫周边站。",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 16,
                    title: "杂志",
                    items: [
                        {
                                            href: "//www.comicfans.net/",
                                            title: "漫友网",
                                            desc: "漫友文化官方网站，为读者提供全方位的漫友产品、活动资讯。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.gztwkadokawa.com/",
                                            title: "天闻角川",
                                            desc: "广州天闻角川出版社官网网站。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.zymk.cn/",
                                            title: "知音漫客",
                                            desc: "漫客网是中国领先的原创漫画内容社区平台。",
                                            isShort: true
                                        }
                    ]
                },
        {
                    id: 17,
                    title: "展会",
                    items: [
                        {
                                            href: "//www.moejam.com/",
                                            title: "梦域动漫",
                                            desc: "梦域动漫网立志于一站式ACG服务新体验。",
                                            isShort: true
                                        },
                        {
                                            href: "//nyato.com/",
                                            title: "喵特漫展",
                                            desc: "Nyato喵特漫展活动平台是一个有爱、贴心、便捷的漫展服务平台。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.wadmz.com/",
                                            title: "野菊漫展",
                                            desc: "前身为我爱动漫展网，是一个提供最新漫展资讯，漫展现场返图、视频分享，以及参展后吐槽的平台。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.animepower.cn/",
                                            title: "武汉AP展",
                                            desc: "武汉地区漫展。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.allcpp.cn/",
                                            title: "无差别同人站",
                                            desc: "无差别同人站拥有国内各类同人展会、同人制品资讯，致力于为广大的同人文化爱好者提供一个信息交流服务平台。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.yimoe.cc/forum-103-1.html",
                                            title: "翼萌漫展",
                                            desc: "一个有爱、贴心、便捷的漫展服务平台。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.bihaiji.com/",
                                            title: "碧海祭",
                                            desc: "漫展网站。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.bo2.cn/",
                                            title: "Bo2动漫",
                                            desc: "漫展网站。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.likeacg.com/",
                                            title: "漫影",
                                            desc: "福建本土最大的动漫资讯网站",
                                            isShort: false
                                        },
                        {
                                            href: "//www.mycacg.com/",
                                            title: "MYC",
                                            desc: "漫展网站。",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 18,
                    title: "工具",
                    items: [
                        {
                                            href: "//www.mengma.moe/",
                                            title: "萌码-颜文字",
                                            desc: "用程序让字符编码卖萌，用代码让ASCII艺术卖萌，这不是颜文字，这是萌码。学习在线用程序卖萌，尽在萌码！",
                                            isShort: true
                                        },
                        {
                                            href: "//job.nyato.com/",
                                            title: "喵特工坊",
                                            desc: "Nyato喵特工坊是ACG创意者互助平台。",
                                            isShort: true
                                        },
                        {
                                            href: "//151.hk/",
                                            title: "漫锋网の系统萌化",
                                            desc: "漫锋网是专业的系统萌化资源网站，提供最新的动漫桌面主题，最专业的萌化技术。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.cgsfusion.com/",
                                            title: "Fusion中文网",
                                            desc: "Fusion中文网是国内第一家以学习交流为主的专业网站，提供了交流学习的平台。",
                                            isShort: true
                                        },
                        {
                                            href: "//pan.diemoe.net/",
                                            title: "呆萌云服务",
                                            desc: "呆萌云存储是一个以网盘服务为核心搭建的强大的云服务平台，只针对二次元圈子服务。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.moepic.net/",
                                            title: "幻域图床",
                                            desc: "萌图床是一个专业的二次元图片分享平台. 实时的资源更新, 任何人均可提交分享自己的资源, 是一个人人都能自由交流的分享平台。",
                                            isShort: true
                                        },
                        {
                                            href: "//hh.cc8.cc/",
                                            title: "希望盒子",
                                            desc: "现在我们提供一些网游的辅助工具，能帮助你征战外服。",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 19,
                    title: "购萌物",
                    items: [
                        {
                                            href: "//www.masadora.net/",
                                            title: "玛沙多拉",
                                            desc: "魔法集市玛沙多拉采用7x24小时全自助式代购系统，专注于二次元，为用户提供快捷方便的ACG代购。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.030buy.net/",
                                            title: "萌购代购",
                                            desc: "二次元海淘代购网站。",
                                            isShort: true
                                        },
                        {
                                            href: "//manzong.tmall.com/",
                                            title: "漫踪",
                                            desc: "开发和销售精品动漫周边，在业内具有较高的影响力，中国动漫周边产业的重要力量。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.cycang.com/",
                                            title: "次元仓",
                                            desc: "次元仓-好玩的二次元周边网站。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.yukicomic.com/",
                                            title: "Yuki动漫",
                                            desc: "Yuki动漫，一个专注于ACGN周边领域的商城，将社区、精品导购、内容研发紧密结合的综合服务平台。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.amazon.co.jp/",
                                            title: "日本亚马逊",
                                            desc: "日本亚马逊，二次元购物圣地，日文站。",
                                            isShort: true
                                        },
                        {
                                            href: "//churuya.taobao.com/",
                                            title: "鹤屋通贩",
                                            desc: "动漫周边贩卖",
                                            isShort: false
                                        },
                        {
                                            href: "//meitewj.tmall.com/",
                                            title: "Animate周边",
                                            desc: "周边、手办贩卖。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.moehot.com/",
                                            title: "萌热",
                                            desc: "艾漫二次元动漫社区、ACG正版作品周边。",
                                            isShort: false
                                        },
                        {
                                            href: "https://www.alipay.com/",
                                            title: "支付宝",
                                            desc: "支付宝，全球领先的独立第三方支付平台，致力于为广大用户提供安全快速的电子支付。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.taobao.com/",
                                            title: "淘宝网",
                                            desc: "亚洲最大、最安全的网上交易平台。",
                                            isShort: false
                                        },
                        {
                                            href: "//acg.taobao.com/",
                                            title: "淘宝ACG",
                                            desc: "周边、手办贩卖。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.amazon.cn/",
                                            title: "亚马逊",
                                            desc: "亚马逊中国，图书画集手办，本命带回家。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.modian.com/",
                                            title: "摩点网",
                                            desc: "购物，众筹。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.77acg.com/",
                                            title: "77动漫",
                                            desc: "77动漫店是国内著名动漫店加盟品牌。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.jd.com/",
                                            title: "京东JD",
                                            desc: "京东JD.COM-综合网上购物商城，看动漫玩游戏拿快递。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.yhd.com/",
                                            title: "1号店",
                                            desc: "网上超市1号店，没时间下楼，叫1号店，妈妈再也不用担心我没有手纸用了。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.suning.com/",
                                            title: "苏宁易购",
                                            desc: "苏宁易购，正品行货，不想坑队友是时候升级装备了。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.fanacg.com/",
                                            title: "种草没",
                                            desc: "二次元好物社区",
                                            isShort: false
                                        },
                        {
                                            href: "https://manqumy.tmall.com/?spm=a1z10.1-b-s.1997427721.d49180",
                                            title: "漫趣旗舰店",
                                            desc: "二次元好物。",
                                            isShort: false
                                        },
                        {
                                            href: "https://aimandm.tmall.com",
                                            title: "艾漫动漫",
                                            desc: "艾漫动漫\n                                                    致力于正版动漫",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 20,
                    title: "部落格",
                    items: [
                        {
                                            href: "//www.kankelu.com/",
                                            title: "看客路",
                                            desc: "围绕ACG的动漫资讯发布,完全不工口的里界声优介绍。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.2cyxw.com/",
                                            title: "二次元小窝",
                                            desc: "二次元个人博客。",
                                            isShort: true
                                        },
                        {
                                            href: "//weibo.com/claa?c=spr_qdhz_bd_baidusmt_weibo_s&nick=%E",
                                            title: "萝莉志杂志官微",
                                            desc: "《萝莉志》杂志官方微博",
                                            isShort: true
                                        },
                        {
                                            href: "//weibo.com/312444618?source=blog#_rnd1439309724596",
                                            title: "林大B",
                                            desc: "画画的林大B官方认证微博",
                                            isShort: true
                                        },
                        {
                                            href: "//weibo.com/734580733?topnav=1&wvr=6&topsug=1",
                                            title: "LoveLive主页君",
                                            desc: "LoveLive主页君",
                                            isShort: true
                                        },
                        {
                                            href: "//weibo.com/moe321?is_all=1",
                                            title: "Moe321萌站官微",
                                            desc: "Moe321萌站官方微博，求关注，求关注，求关注，重要的事情要说三遍(/ω＼)",
                                            isShort: true
                                        },
                        {
                                            href: "//space.bilibili.com/461637/#!/index",
                                            title: "橙心社",
                                            desc: "橙心社前身为绝对动漫，是一档多人动漫脱口秀节目，定期更新，不看你就奥特啦。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.otkz.net",
                                            title: "狗熊管理局档案馆",
                                            desc: "档案馆是小兽人分享个人生活点滴的地方，包括但不限于软件推荐，生活记录以及ACG相关福利资源",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 21,
                    title: "度娘贴吧",
                    items: [
                        {
                                            href: "//tieba.baidu.com/f?kw=%CA%D6%B0%EC&fr=ala0",
                                            title: "手办吧",
                                            desc: "手办。",
                                            isShort: true
                                        },
                        {
                                            href: "//tieba.baidu.com/f?kw=%C3%C8%D5%BD",
                                            title: "萌战吧",
                                            desc: "萌战吧",
                                            isShort: true
                                        },
                        {
                                            href: "//tieba.baidu.com/f?ie=utf-8&kw=akb48&fr=search",
                                            title: "akb48吧",
                                            desc: "akb48吧",
                                            isShort: true
                                        },
                        {
                                            href: "//tieba.baidu.com/f?kw=moe321&fr=home&fp=0&ie=utf-8",
                                            title: "moe321吧",
                                            desc: "moe321·萌321官方贴吧",
                                            isShort: true
                                        }
                    ]
                },
        {
                    id: 22,
                    title: "ACG资源",
                    items: [
                        {
                                            href: "//moe.005.tv/",
                                            title: "萌娘资源",
                                            desc: "萌娘资源专业站点，致力于传播二次元萌文化&宅文化，万物皆可萌",
                                            isShort: true
                                        },
                        {
                                            href: "//vcb-s.com/",
                                            title: "VCB-Studio",
                                            desc: "VCB-Studio-资源满满",
                                            isShort: true
                                        },
                        {
                                            href: "//www.tokyotosho.info/",
                                            title: "東京 図書館",
                                            desc: "東京\n                                                    図書館,资源满满，福利满满",
                                            isShort: true
                                        },
                        {
                                            href: "//www.dilidili.com/",
                                            title: "嘀哩嘀哩",
                                            desc: "新番资源。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.mikuclub.cc/",
                                            title: "初音社",
                                            desc: "这里是初音社|\n                                                    一个专注于V家周边资源以及ACG资源分享的平台网站。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.yzzyup.com/",
                                            title: "御宅之翼",
                                            desc: "提供所有动漫相关资源的综合动漫论坛",
                                            isShort: true
                                        },
                        {
                                            href: "//www.kisssub.org/",
                                            title: "爱恋动漫下载",
                                            desc: "爱恋字幕社官方BT分享站，动画～漫画～游戏～动漫音乐～片源（RAW）资源聚集地～欢迎各大字幕组及个人发布入住！",
                                            isShort: false
                                        },
                        {
                                            href: "//www.hgamecn.com/",
                                            title: "Hgamecn",
                                            desc: "福利游戏存档资源下载&介绍",
                                            isShort: false
                                        },
                        {
                                            href: "//acg12.com/",
                                            title: "ACG调查小队",
                                            desc: "拥有众多的动漫资源帝，每日更新数千张动漫美图、P站图集、输入法皮肤，以及大量win7、win8、安卓主题和游戏音乐资源。",
                                            isShort: false
                                        },
                        {
                                            href: "//dm1080p.com/",
                                            title: "DM1080",
                                            desc: "D动漫1080P,高清动漫下载资料站。",
                                            isShort: false
                                        },
                        {
                                            href: "//bt.acg.gg/",
                                            title: "ACG狗狗",
                                            desc: "提供动画,漫画,电子书,动漫音乐,动漫游戏等资源下载。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.yaociyuan.com/",
                                            title: "妖次元",
                                            desc: "神奇的彼岸,绅士与老司机的停歇地。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.acgnw.cn",
                                            title: "次元之家",
                                            desc: "次元之家 -\n                                                    一个为广大ACG爱好者提供的净土。",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 23,
                    title: "APP市场",
                    items: [
                        {
                                            href: "//www.apple.com/cn/itunes/download/",
                                            title: "iTunes",
                                            desc: "绝佳的数字音乐点唱机。音乐、视频、App 及更多精彩内容。",
                                            isShort: true
                                        },
                        {
                                            href: "//moeapk.com/",
                                            title: "萌萌安卓",
                                            desc: "这是一个专属于ACG二次元动漫爱好者的安卓应用基地，专门仅提供ACG萌系安卓应用下载以及分享服务。",
                                            isShort: true
                                        },
                        {
                                            href: "//app.moefou.org/",
                                            title: "MoeApp",
                                            desc: "萌系iOS\n                                                    App交流平台，为您带来最新最萌的软件。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.wandoujia.com/",
                                            title: "豌豆荚",
                                            desc: "豌豆荚让你的安卓手机简单好用，轻松管理手机，免费下载应用、视频、音乐、壁纸和电子书，管理通讯录，快速备份手机。",
                                            isShort: true
                                        },
                        {
                                            href: "https://www.taptap.com",
                                            title: "TapTap",
                                            desc: "TapTap是一个推荐高品质手游的手游分享社区，与全球玩家共同交流并发掘高品质手游。",
                                            isShort: true
                                        }
                    ]
                },
        {
                    id: 24,
                    title: "我的世界",
                    items: [
                        {
                                            href: "https://minecraft.net/",
                                            title: "我的世界官方主页",
                                            desc: "我的世界游戏。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.mcbbs.net/",
                                            title: "我的世界中文论坛",
                                            desc: "Minecraft玩家创造，交流和分享的中文平台！",
                                            isShort: true
                                        },
                        {
                                            href: "//nyaa.cat/",
                                            title: "喵窝",
                                            desc: "我的世界游戏。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.mcmod.cn/",
                                            title: "MC百科",
                                            desc: "我的世界百科，提供MineCraft模组MOD物品介绍、MC教程、攻略、汉化、MOD下载。",
                                            isShort: true
                                        }
                    ]
                },
        {
                    id: 25,
                    title: "手游OL",
                    items: [
                        {
                                            href: "//qjnn.qq.com/",
                                            title: "奇迹暖暖",
                                            desc: "暖暖系列新作《奇迹暖暖》全新的换装养成手游，官方网站。",
                                            isShort: true
                                        },
                        {
                                            href: "//yys.163.com/",
                                            title: "阴阳师",
                                            desc: "网易2016自研精品，唯美空灵的和风写意，经典的半即时回合制RPG，上百种式神亟待觉醒......",
                                            isShort: true
                                        },
                        {
                                            href: "//touken.youzu.com/",
                                            title: "刀剑乱舞",
                                            desc: "《刀剑乱舞-ONLINE-》是由DMM GAMES官方授权，游族网络在中国独家代理发行的现象级人气游戏。",
                                            isShort: true
                                        },
                        {
                                            href: "//gf.ppgame.com/",
                                            title: "少女前线",
                                            desc: "《少女前线》是一款二次元枪娘养成战术手游。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.bh3.com/",
                                            title: "崩坏3",
                                            desc: "某不科学的国产动作游戏，为世界上所有的美好而战。",
                                            isShort: true
                                        },
                        {
                                            href: "//zjzk.xiimoon.com/",
                                            title: "执剑之刻",
                                            desc: "《执剑之刻》是由拾梦文化Xiimoon与Rejet联袂创作的绮丽浪漫和风奇谭。",
                                            isShort: true
                                        },
                        {
                                            href: "//game.bilibili.com/fgo/",
                                            title: "Fate",
                                            desc: "《命运/冠位指定（Fate/Grand Order）》是Fate系列首款正版手游。",
                                            isShort: false
                                        },
                        {
                                            href: "//f7.163.com/",
                                            title: "永远的七日之都",
                                            desc: "网易自研手游，在《永远的7日之都》，用7天时间，你将逐步寻找到，城市、你、还有其他隐藏着的一切秘密。",
                                            isShort: false
                                        },
                        {
                                            href: "//ma.163.com/",
                                            title: "乖离性百万亚瑟王",
                                            desc: "《乖离性百万亚瑟王》卡牌之王，全面进化！官方网站。",
                                            isShort: false
                                        },
                        {
                                            href: "//ll.sdo.com/",
                                            title: "Love Live!",
                                            desc: "《Love\n                                                    Live!\n                                                    学园偶像祭》官方网站，小姐姐们在召唤你哦。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.benghuai.com/",
                                            title: "崩坏学园2",
                                            desc: "《崩坏学园2》官方网站，技术宅团队打造，收集品是各种胖次，配音也是萌萌哒。",
                                            isShort: false
                                        },
                        {
                                            href: "//mlk.qijee.com/",
                                            title: "梅露可物語",
                                            desc: "《梅露可物語》官方网站,来和王子一起弹珠吧。",
                                            isShort: false
                                        },
                        {
                                            href: "//op.mobage.cn/",
                                            title: "航海王启航",
                                            desc: "《航海王启航》是首款中国大陆地区正版授权的航海王手游。官方网站。",
                                            isShort: false
                                        },
                        {
                                            href: "//nuan.wan.liebao.cn/",
                                            title: "暖暖环游世界",
                                            desc: "《暖暖环游世界》游戏官网，风靡亚洲的换装手游。",
                                            isShort: false
                                        },
                        {
                                            href: "//gz.kongzhong.com/",
                                            title: "我家公主最可爱",
                                            desc: "《我家公主最可爱》是一款结合了弹珠、卡牌、育成等元素的 RPG 手机游戏。",
                                            isShort: false
                                        },
                        {
                                            href: "//hyrz.qq.com/",
                                            title: "火影忍者手游",
                                            desc: "《火影忍者》正版授权官方网站。",
                                            isShort: false
                                        },
                        {
                                            href: "//gintama.mobage.cn/",
                                            title: "银时之魂",
                                            desc: "《银时之魂》官方网站",
                                            isShort: false
                                        },
                        {
                                            href: "//mx.yingxiong.com/",
                                            title: "冒险与挖矿",
                                            desc: "《冒险与挖矿》官方网站",
                                            isShort: false
                                        },
                        {
                                            href: "//zj.p1p1game.com/",
                                            title: "战舰少女",
                                            desc: "《战舰少女》官方网站",
                                            isShort: false
                                        },
                        {
                                            href: "https://www.arknights.com/",
                                            title: "明日方舟",
                                            desc: "《明日方舟》是一款魔物主题的策略手游。",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 26,
                    title: "端游OL",
                    items: [
                        {
                                            href: "//ffo.changyou.com/",
                                            title: "幻想神域",
                                            desc: "亚洲第一动漫网游《幻想神域》新资料片“逆转的命运”震撼开放，85级解禁，武器专精强势开启！",
                                            isShort: true
                                        },
                        {
                                            href: "//els.ztgame.com/",
                                            title: "艾尔之光",
                                            desc: "萌系格斗网游。",
                                            isShort: true
                                        },
                        {
                                            href: "//lol.qq.com/",
                                            title: "英雄联盟",
                                            desc: "英雄联盟官方网站，海量风格各异的英雄，LOL坑队友。",
                                            isShort: true
                                        },
                        {
                                            href: "//ff.sdo.com/",
                                            title: "最终幻想14",
                                            desc: "盛大游戏代理，SE旗下创下1亿套销量的最终幻想系列最新力作。",
                                            isShort: true
                                        },
                        {
                                            href: "//jx3.xoyo.com/",
                                            title: "剑网3",
                                            desc: "《剑网3》游戏官网。",
                                            isShort: true
                                        },
                        {
                                            href: "//dnf.qq.com/",
                                            title: "DNF",
                                            desc: "DNF游戏官网，地下城。",
                                            isShort: true
                                        },
                        {
                                            href: "//web.sanguosha.com/",
                                            title: "三国杀",
                                            desc: "三国杀游戏官网。",
                                            isShort: false
                                        },
                        {
                                            href: "//bns.qq.com/",
                                            title: "剑灵",
                                            desc: "《剑灵》官方网站。",
                                            isShort: false
                                        },
                        {
                                            href: "//dn.sdo.com/",
                                            title: "龙之谷",
                                            desc: "盛大游戏代理，Eyedentity Games开发的一款3D动作MMORPG游戏。",
                                            isShort: false
                                        },
                        {
                                            href: "//wuxia.qq.com/",
                                            title: "天涯明月刀OL",
                                            desc: "天涯明月刀-官方网站-腾讯游戏-电影网游新艺术，造型太美二次元也无法抵抗。",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 27,
                    title: "综合手游",
                    items: [
                        {
                                            href: "//jp.appgame.com/",
                                            title: "11区",
                                            desc: "11区 -\n                                                    日系手机游戏第一站",
                                            isShort: true
                                        },
                        {
                                            href: "//www.muzhiwan.com/",
                                            title: "拇指玩",
                                            desc: "国内领先的手机游戏下载平台。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.pujia8.com/",
                                            title: "扑家汉化",
                                            desc: "国内首个汉化游戏发布平台，为玩家提供最新的汉化资讯和汉化资源下载。同时又是个同性/异性玩家交友社区，据闻有5w妹子驻扎。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.moeyoyo.com",
                                            title: "萌游网",
                                            desc: "萌游网moeyoyo,一个有趣的二次元动漫游戏门户",
                                            isShort: true
                                        },
                        {
                                            href: "//www.moeplay.com/",
                                            title: "萌玩网",
                                            desc: "萌玩是十一区二次元游戏传送站,专注于ACG相关游戏的分享,目前有情报,攻略,评测,事前,游戏,福利,活动等板块。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.itmo.com/",
                                            title: "itmo爱萌",
                                            desc: "ITMO爱萌游戏网是国内精品二次元游戏门户，主打二次元精品手游攻略，分享第一手新鲜好玩的手游资讯。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.d.cn/",
                                            title: "当乐网",
                                            desc: "国内领先的手机游戏下载平台。",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 28,
                    title: "综合游戏",
                    items: [
                        {
                                            href: "//www.3dmgame.com/",
                                            title: "3DM",
                                            desc: "3DMGAME以最专业的单机游戏新闻中心，攻略中心,最丰富的单机游戏下载大全中文版下载资源。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.gamersky.com/",
                                            title: "游民星空",
                                            desc: "游民星空是国内单机游戏门户网站。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.pokemon.name/",
                                            title: "口袋妖怪网",
                                            desc: "集合各类口袋妖怪资讯、讨论、攻略、研究、下载、百科、图鉴等于一体的中国口袋妖怪门户网站。",
                                            isShort: true
                                        },
                        {
                                            href: "//wanga.me/",
                                            title: "拼命玩游戏",
                                            desc: "拼命玩游戏的前身是拼命玩三郎的小游戏博客。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.joyme.com/",
                                            title: "着迷网",
                                            desc: "着迷网为广大玩家提供最专业的手游评测，最新的手游攻略，最独家的手游礼包。",
                                            isShort: true
                                        },
                        {
                                            href: "//store.steampowered.com/",
                                            title: "Steam",
                                            desc: "综合游戏网站。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.5173.com/",
                                            title: "5173站",
                                            desc: "网络游戏交易平台。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.duowan.com/",
                                            title: "多玩游戏",
                                            desc: "综合游戏网站。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.17173.com/",
                                            title: "17173游戏",
                                            desc: "综合游戏网站。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.ali213.net/",
                                            title: "游侠网",
                                            desc: "坚守单机阵地，弘扬单机文化！",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 29,
                    title: "赚钱养家",
                    items: [
                        {
                                            href: "//dm.job1001.com/",
                                            title: "一览动漫英才网",
                                            desc: "一览动漫英才网—中国最权威的动漫动画行业人才求职招聘网站",
                                            isShort: true
                                        },
                        {
                                            href: "//www.jobg.cn/",
                                            title: "游戏智聘网",
                                            desc: "CG人才招聘以及游戏运营人才,手机游戏开发人才与设计人才招聘的首选。",
                                            isShort: true
                                        },
                        {
                                            href: "//job.cgjoy.com/",
                                            title: "CG招聘网",
                                            desc: "是专门针对游戏行业的垂直招聘网站，为游戏行业的人才提供就业信息，为游戏行业的公司提供一个专门、高效、有序的招聘平台。",
                                            isShort: true
                                        },
                        {
                                            href: "https://www.linkedin.com/",
                                            title: "领英",
                                            desc: "轻松管理职业生涯打造自己专属的职业人脉。掌握行业资讯，让机会自动上门。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.lagou.com/",
                                            title: "拉勾网",
                                            desc: "拉勾网是最权威的互联网行业招聘网站,提供全国真实的互联网招聘信息。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.dajie.com/",
                                            title: "大街网",
                                            desc: "大街网是中国移动社交招聘领导者，用互联网思维，彻底颠覆传统招聘业态。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.yjbys.com/",
                                            title: "应届毕业生网",
                                            desc: "应届毕业生网作为大型的应届生求职招聘网站,专注为广大应届毕业生服务。",
                                            isShort: false
                                        },
                        {
                                            href: "//my.51job.com/",
                                            title: "前程无忧",
                                            desc: "找工作求职，上前程无忧。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.chinahr.com/",
                                            title: "中华英才网",
                                            desc: "中华英才网，人才招聘。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.liepin.com/",
                                            title: "猎聘网",
                                            desc: "猎聘网为中高端人才提供超过500万条高薪职位信息。",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 30,
                    title: "生活",
                    items: [
                        {
                                            href: "//www.sf-express.com/",
                                            title: "顺丰速运",
                                            desc: "快递公司官网，快递公司分两种，一种叫顺丰，一种叫其他快递。",
                                            isShort: true
                                        },
                        {
                                            href: "//chaoshi.tmall.com/",
                                            title: "天猫超市",
                                            desc: "阿里爸爸旗下B2C大型超市，饿了可以买点储备粮。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.yto.net.cn/",
                                            title: "圆通快递",
                                            desc: "快递公司官网，据说性价比还不错。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.12306.cn/",
                                            title: "12306火车票",
                                            desc: "中国铁路客户服务中心网站是铁路服务客户的重要窗口，每到逢年过节就会人气爆棚。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.kuaidi100.com/",
                                            title: "快递100",
                                            desc: "快递100，综合速查快递。",
                                            isShort: true
                                        }
                    ]
                },
        {
                    id: 31,
                    title: "去旅行",
                    items: [
                        {
                                            href: "//www.jpbeta.net/category/tour/",
                                            title: "JPbeta日旅游",
                                            desc: "日旅游，JPbeta\n                                                    多元化日本旅行资讯站。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.tongnews.org/",
                                            title: "痛新闻",
                                            desc: "每天对日本各地举办的最受关注的动漫、游戏活动进行现场报道；不定期制作 《圣地巡礼》 系列专题，动漫业内名人访谈等。",
                                            isShort: true
                                        }
                    ]
                },
        {
                    id: 32,
                    title: "2.5次元",
                    items: [
                        {
                                            href: "//www.snh48.com/",
                                            title: "SNH48官方网站",
                                            desc: "SNH48是由著名词作家及影视节目专家，AKB48之父秋元康先生担任总督导，由AKB48培训团队亲自指导，中国本土大型女子偶像团体。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.maeda-atsuko.cn/",
                                            title: "酱坛",
                                            desc: "前田敦子应援会，华语地区首个前田敦子Fans专属中文交流讨论的互动平台。AKB48最大资源聚集地。",
                                            isShort: true
                                        },
                        {
                                            href: "https://www.atf.com/",
                                            title: "ATF官方公式站",
                                            desc: "女子偶像组合ATF,是一支横跨二次元及三次元的偶像团体,在传统的偶像概念上,展现每个成员不同个性定位的一面。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.snh0048.com/",
                                            title: "48日饭社",
                                            desc: "48日饭社成立努力为全球喜欢AKB48系的粉丝们提供所有AKB48系的即时消息，希望大家支持48日饭社。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.ss-idol.com/",
                                            title: "SS Idol少女团体官方网站",
                                            desc: "SS\n                                                    Idol少女团体官方网站",
                                            isShort: true
                                        },
                        {
                                            href: "//www.lunargirls.com/",
                                            title: "Lunar组合",
                                            desc: "Lunar\n                                                    是以真实、励志、青春为基本理念打造而成的中国原创偶像，成立于2011年4月。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.ladybees.com/",
                                            title: "蜜蜂少女队",
                                            desc: "亚洲首个多元少女团体，次世代近距离个性偶像。",
                                            isShort: false
                                        },
                        {
                                            href: "//weibo.com/p/1006065886178452",
                                            title: "Kimoe组合",
                                            desc: "激萌文化旗下-Kimoe组合",
                                            isShort: false
                                        },
                        {
                                            href: "//www.bololi.com/",
                                            title: "波萝社",
                                            desc: "波萝社是一家致力于模特写真以及模特周边相关产业的互动平台，专注打造人气麻豆。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.at-jam.jp/",
                                            title: "atJAM",
                                            desc: "日本IDo咨询综合站，日文站",
                                            isShort: false
                                        },
                        {
                                            href: "//www.1931.com/",
                                            title: "1931偶像组合",
                                            desc: "1931是国内首支由纳斯达克上市公司聘请港台专属造星团队、注资5亿精心打造的全民少女偶像天团。",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 33,
                    title: "日本语",
                    items: [
                        {
                                            href: "//www.2333jp.com/",
                                            title: "2333日语网",
                                            desc: "2333日语网，日语入门学习。",
                                            isShort: true
                                        },
                        {
                                            href: "//jp.hjenglish.com/",
                                            title: "沪江日语",
                                            desc: "沪江日语是沪江旗下日语学习资讯网站，提供丰富的日语资料、日语互动社区、日语等级考试报名和日语培训等内容。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.jpwind.com/",
                                            title: "和风日语",
                                            desc: "受日语爱好者欢迎的网站。提供丰富的日语学习和日语考试资料、日本时事资讯、日本动漫、日本旅游等。",
                                            isShort: true
                                        }
                    ]
                },
        {
                    id: 34,
                    title: "次元导航",
                    items: [
                        {
                                            href: "//www.moe321.com/",
                                            title: "萌站",
                                            desc: "萌站，次元导航之门，收藏我的二次元。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.moe123.net/",
                                            title: "萌导航",
                                            desc: "你的二次元导航姬。",
                                            isShort: true
                                        },
                        {
                                            href: "https://moe.hao123.com/",
                                            title: "萌主页",
                                            desc: "hao123萌主页只为您服务喔！",
                                            isShort: true
                                        },
                        {
                                            href: "//www.kicokico.com/",
                                            title: "Kico二次元",
                                            desc: "KicoKico(°ˊДˋ°)つ妮酱~二次元世界",
                                            isShort: true
                                        },
                        {
                                            href: "//www.cilicili.cc",
                                            title: "呲哩呲哩",
                                            desc: "「二次元 ? 动漫\n                                                    ?\n                                                    ACG」 °我们谁都无法成为自己以外的任何人，不过，正因为如此才有",
                                            isShort: true
                                        },
                        {
                                            href: "//d.yimoe.cc/",
                                            title: "翼萌导航",
                                            desc: "二次元导航。",
                                            isShort: true
                                        },
                        {
                                            href: "//go.pcmoe.net/",
                                            title: "萌研社",
                                            desc: "二次元导航。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.moe123.org/",
                                            title: "萌小组",
                                            desc: "萌小组,一个以收录动漫网站及资讯为主的网站。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.5ciy.com/",
                                            title: "5次元动漫导航",
                                            desc: "提供各类动漫网址导航，网站大全，让您获得更加简单快捷的二次元体验!从这里发现有趣的网站。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.gal123.com/",
                                            title: "绅士导航♂",
                                            desc: "ss站长的个人收藏夹。",
                                            isShort: false
                                        },
                        {
                                            href: "//www.chainwon.com/",
                                            title: "轻惋导航",
                                            desc: "二次元导航。",
                                            isShort: false
                                        },
                        {
                                            href: "//guide.prdsarea.com/",
                                            title: "御宅导航",
                                            desc: "二次元导航。",
                                            isShort: false
                                        },
                        {
                                            href: "//hao.huiyuanai.com",
                                            title: "灰原哀导航站",
                                            desc: "灰原哀导航网是国内第一家以名侦探柯南为主题的导航网站，本主页及时收录柯南相关的各种资源。",
                                            isShort: false
                                        }
                    ]
                },
        {
                    id: 35,
                    title: "爱国少年",
                    items: [
                        {
                                            href: "//www.people.com.cn/",
                                            title: "人民网",
                                            desc: "中华爱国少年必看权威网站。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.xinhuanet.com/",
                                            title: "新华网",
                                            desc: "中华爱国少年必看权威网站。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.ccyl.org.cn/",
                                            title: "中国共青团",
                                            desc: "中华爱国少年必看权威网站。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.youth.cn/",
                                            title: "中国青年网",
                                            desc: "中华爱国少年必看权威网站。",
                                            isShort: true
                                        },
                        {
                                            href: "//cpc.people.com.cn/",
                                            title: "中国共产党新闻网",
                                            desc: "中华爱国少年必看权威网站。",
                                            isShort: true
                                        },
                        {
                                            href: "//www.gov.cn/",
                                            title: "中国政府网",
                                            desc: "中华爱国少年必看权威网站。",
                                            isShort: true
                                        }
                    ]
                }
    ]
};
