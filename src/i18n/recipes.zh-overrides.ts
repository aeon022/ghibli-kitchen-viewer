import { overrides } from "../i18n-data";

// 示例：给几个卡片写上完美中文，不走词典
overrides.zh["mo-f.title"] = "三文鱼嫩豆腐粥（お粥）";
overrides.zh["mo-f.desc"]  = "日式粥（Okayu），配清蒸三文鱼与嫩豆腐，口味清淡。灵感来自 Just One Cookbook。";
overrides.zh["mo-f.story"] = "Okayu 源自日本，常作早餐或感冒时的清淡餐点，秋冬尤受欢迎，适合安静的清晨。";
overrides.zh["mo-f.target"]= "≈70 g 碳水（2 人）· 蛋白质 ≈20 g/人";
overrides.zh["mo-f.steps"] = [
  "淘米后加清水煮开，小火慢煮 25–30 分钟。",
  "将三文鱼置于粥面清蒸 8–10 分钟，取出剁散。",
  "加入嫩豆腐，姜与低钠酱油调味，撒葱段略焖即可。",
];
overrides.zh["mo-f.swaps"] = "嫩豆腐 ↔ 硬豆腐；三文鱼 ↔ 鳕鱼；替代：牛丼（瘦牛肉）或姜烧猪（瘦猪肉），米饭配比减量。";
overrides.zh["mo-f.side"]  = "温热大麦茶。";
overrides.zh["mo-f.checks"]= "胃炎——清淡温热；糖尿病 ✓ ——≈70 g 碳水；孕期 ✓ ——鱼熟透且低汞。";

// 你可以按需继续为 mo-m、mo-a、… 添加 overrides
// 格式 key = `${id}.${field}`，field: title|desc|story|target|steps|swaps|side|checks