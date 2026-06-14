// Daily pet care article generator
const fs=require('fs'),path=require('path');
const today=new Date().toISOString().slice(0,10),slug=today;
const feedPath=path.join(__dirname,'..','feed.json');
const feed=JSON.parse(fs.readFileSync(feedPath,'utf8'));
if(feed.posts.find(p=>p.slug===slug)){console.log('Already exists');process.exit(0)}

const pool=[
[{title:'猫咪呕吐的5种常见原因及处理方法',desc:'观察呕吐物颜色和频率，判断是毛球还是疾病。附紧急处理步骤和就医时机。',tag:'猫咪健康'},
{title:'新手养猫必看：接猫前要准备什么',desc:'猫砂盆、猫抓板、猫粮、猫碗、航空箱……一份完整的接猫清单。',tag:'新手养宠'},
{title:'狗狗拉肚子怎么办？家庭应急处理指南',desc:'禁食观察、补充水分、益生菌辅助。什么情况需要马上去医院？',tag:'狗狗健康'},
{title:'猫咪驱虫全攻略：体内外驱虫时间和药物选择',desc:'幼猫成猫驱虫频率不同，附常见驱虫药对比和使用方法。',tag:'预防保健'},
{title:'狗狗换牙期注意事项',desc:'4-6个月大的小狗开始换牙，磨牙玩具怎么选？咬坏家具怎么办？',tag:'狗狗健康'}],

[{title:'猫咪突然不在猫砂盆里上厕所？原因和解决办法',desc:'可能是猫砂不喜欢、猫砂盆太脏、泌尿系统问题或领地标记行为。',tag:'行为问题'},
{title:'养狗新手入门：不同犬种的性格和养护要点',desc:'金毛温顺但掉毛多，泰迪聪明但需要打理，柯基活泼但容易发胖。',tag:'新手养宠'},
{title:'猫咪挑食不吃猫粮？试试这6个方法',desc:'定时定量、加热增加香气、换粮过渡法、控制零食。持续不吃饭要警惕脂肪肝。',tag:'猫咪健康'},
{title:'狗狗分离焦虑症的识别和改善',desc:'独自在家狂叫、拆家、随地大小便。逐步训练+环境丰容来缓解。',tag:'行为问题'},
{title:'宠物疫苗怎么打？猫三联狗六联接种时间表',desc:'幼宠从几周开始打第一针？每年都要加强吗？抗体检测有没有必要？',tag:'预防保健'}],

[{title:'猫咪发情的表现和绝育的最佳时机',desc:'母猫嚎叫、公猫乱尿。6-8个月大是最佳绝育年龄，术前术后注意事项。',tag:'猫咪健康'},
{title:'狗狗出门爆冲怎么训练？遛狗不再被拖行',desc:'P绳使用技巧、随行训练步骤、奖励时机。从室内练到室外循序渐进。',tag:'行为训练'},
{title:'猫咪黑下巴是怎么回事？猫痤疮的治疗和预防',desc:'猫粮油腻、食盆塑料材质、清洁不及时都可能导致。换陶瓷碗+每天清洗。',tag:'常见问题'},
{title:'老年犬的护理要点：饮食、运动和体检',desc:'7岁以上的狗狗算步入老年，关节保健、低脂饮食、定期体检一个不能少。',tag:'老年护理'},
{title:'猫咪应激反应：搬家和去医院的正确处理方式',desc:'费洛蒙喷雾、提前适应航空箱、医院选择猫友好型诊所。',tag:'行为问题'}],

[{title:'狗狗皮肤病大全：真菌、螨虫、湿疹怎么区分',desc:'脱毛、红疹、瘙痒、皮屑……不同症状对应不同病因，用药也完全不同。',tag:'疾病防治'},
{title:'猫咪需要刷牙吗？牙结石的危害和口腔护理',desc:'口臭、流口水、牙龈红肿可能已经是牙周病。从牙刷牙膏到洁牙零食全攻略。',tag:'日常护理'},
{title:'狗狗的社交化训练：什么时候开始，怎么做',desc:'3-16周是社交化黄金期。让狗狗接触不同的人、狗、环境、声音。',tag:'行为训练'},
{title:'猫咪吐毛球正常吗？化毛膏要吃多少',desc:'每周1-2次吐毛球正常。化毛膏、猫草、勤梳毛三管齐下。频繁呕吐要就医。',tag:'常见问题'},
{title:'宠物中暑的急救和预防',desc:'夏天不要留宠物在车内！中暑症状：张口呼吸、流口水、走路摇晃。立即降温+送医。',tag:'紧急处理'}],

[{title:'猫粮怎么选？成分表怎么看',desc:'前三位应该是肉而不是谷物。蛋白质含量至少30%。无谷≠优质，看具体配方。',tag:'饮食营养'},
{title:'狗狗可以吃水果吗？这7种水果千万别喂',desc:'葡萄和葡萄干最危险会导致肾衰竭。苹果去核、西瓜去籽、蓝莓适量可以吃。',tag:'饮食营养'},
{title:'猫咪喝水量不够？5个骗水小妙招',desc:'流动饮水机、罐头加水、多放几个水碗。长期喝水少容易导致泌尿系统疾病。',tag:'日常护理'},
{title:'狗狗的服从性训练：坐、卧、等待、过来',desc:'从最简单的坐开始，每次5-10分钟，用正向激励。训练器、零食和耐心缺一不可。',tag:'行为训练'},
{title:'养猫养狗可以养绿植吗？对宠物有毒的植物清单',desc:'百合花对猫剧毒、滴水观音、绿萝、虎尾兰都有毒。养宠家庭建议选择猫草、蕨类。',tag:'安全知识'}],

[{title:'宠物掉毛季怎么办？梳子和吸尘器推荐',desc:'换季掉毛是正常生理现象。排梳、针梳、除毛梳怎么选？空气净化器有帮助。',tag:'日常护理'},
{title:'猫咪突然跛行？可能是血栓或骨折',desc:'肥厚性心肌病引发的动脉血栓在猫身上并不罕见。突然瘫痪要立即去急诊。',tag:'紧急处理'},
{title:'狗狗乱咬东西的纠正方法',desc:'磨牙期、无聊、分离焦虑都可能导致。提供合适的咀嚼玩具+充分的运动消耗。',tag:'行为问题'},
{title:'宠物托运全攻略：飞机火车汽车怎么带宠物',desc:'检疫证明办理流程、航空箱要求、托运公司选择、费用参考。提前一个月准备。',tag:'实用攻略'},
{title:'猫咪和狗狗能和平相处吗？引入新宠物的正确步骤',desc:'隔离→气味交换→隔着门见面→同时喂食→短时接触→延长相处时间。耐心是关键。',tag:'行为问题'}],

[{title:'宠物保险值得买吗？主流宠物险对比',desc:'支付宝/微信/平安/众安宠物医保对比。免赔额、赔付比例、等待期要仔细看。',tag:'实用攻略'},
{title:'猫咪的慢性肾病：早期症状和日常管理',desc:'7岁以上老年猫高发。多饮多尿是早期信号。肾脏处方粮+皮下补液可延缓病程。',tag:'老年护理'},
{title:'狗狗突然不吃不喝？别拖马上去医院',desc:'胰腺炎、异物梗阻、胃肠炎都可能。24小时不吃不喝就是危险信号。',tag:'紧急处理'},
{title:'自制宠物零食：简单健康的鸡肉干和鱼干做法',desc:'鸡胸肉切薄片，70度烘干6小时。无添加剂，比买的零食健康便宜。',tag:'饮食营养'},
{title:'遛狗时遇到其他狗冲过来怎么办',desc:'保持冷静、侧身挡住自己的狗、用身体隔开。不要尖叫或抱起小狗（会刺激对方）。',tag:'安全知识'}],

[{title:'猫咪上厕所蹲很久却没有尿？可能是尿闭',desc:'尤其是公猫高发。尿闭24-48小时可能致命。立即就医！预防：多喝水+处方粮。',tag:'紧急处理'},
{title:'狗狗指甲怎么剪？不剪有什么危害',desc:'血线位置判断、专用指甲钳使用、剪伤后止血粉。不剪指甲会变形影响走路。',tag:'日常护理'},
{title:'猫咪喜欢抓家具怎么办？猫抓板的正确摆放',desc:'放在猫咪经常经过的地方，不要藏起来。剑麻、纸板、地毯不同材质都试试。',tag:'行为问题'},
{title:'宠物看病为什么这么贵？帮你省钱的小技巧',desc:'定期体检预防大于治疗。宠物医保+线上问诊+选择社区医院非转诊中心。',tag:'实用攻略'},
{title:'冬天猫咪保暖指南：暖水袋、猫窝和室温',desc:'短毛猫和无毛猫更怕冷。暖水袋要包毛巾避免烫伤，猫窝远离门窗。',tag:'日常护理'}],
];

const idx=(new Date().getDate()-1)%pool.length;
const items=pool[idx];
const titles=[`今日宠物养护 | ${items[0].tag}`, `养宠必看：${items[0].title.substring(0,15)}…`, `宠物知识分享 | ${today}`, `铲屎官必读 | ${items[0].tag}专题`];
const postTitle=titles[new Date().getDate()%titles.length];

feed.posts.unshift({slug,date:today,title:postTitle,items});
feed.updated=today;fs.writeFileSync(feedPath,JSON.stringify(feed,null,2));

// Generate post HTML
const html=`<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${postTitle} - 宠物养护知识</title><meta name="description" content="${items.map(i=>i.title).join('、')}"><style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}:root{--bg:#fafafa;--card:#fff;--text:#1a1a2e;--t2:#666;--accent:#059669;--border:#e5e7eb;--r:10px}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans SC",sans-serif;background:var(--bg);color:var(--text);line-height:1.7;min-height:100vh}.container{max-width:800px;margin:0 auto;padding:0 20px}header{background:var(--card);border-bottom:1px solid var(--border);padding:20px 0;margin-bottom:32px}header a{color:var(--accent);text-decoration:none;font-size:.9rem}header h1{font-size:1.3rem;margin-top:8px}.post{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:28px}.post .date{color:var(--t2);font-size:.8rem;margin-bottom:20px}.entry{margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--border)}.entry:last-child{border-bottom:none}.entry h3{font-size:1rem;margin-bottom:4px}.entry p{color:var(--t2);font-size:.9rem}.tag{display:inline-block;background:#ecfdf5;color:var(--accent);font-size:.72rem;padding:2px 8px;border-radius:10px;margin-left:6px}footer{text-align:center;padding:32px 20px;color:var(--t2);font-size:.8rem}@media(max-width:600px){.post{padding:18px}}</style></head><body><header><div class="container"><a href="../index.html">← 宠物养护首页</a><h1>${postTitle}</h1></div></header><main class="container"><article class="post"><div class="date">📅 ${today}</div>${items.map(i=>`<div class="entry"><h3>${i.title} <span class="tag">${i.tag}</span></h3><p>${i.desc}</p></div>`).join('')}</article></main><footer><p>宠物养护知识库 · 每日更新</p></footer></body></html>`;
fs.writeFileSync(path.join(__dirname,'..','posts',`${slug}.html`),html);
console.log('Generated:',postTitle);
