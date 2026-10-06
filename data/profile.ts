export type Education = {
  period: string;
  degree: string;
  school: string;
  note: string;
};

export type Career = {
  period: string;
  position: string;
  organization: string;
  note: string;
};

export type Profile = {
  name: string;
  role: string;
  email: string;
  photo: string;
  bio: string[];
  education: Education[];
  career: Career[];
  copyrightYear: number;
};

export const profile: Profile = {
  name: "Tianrui Dai",
  role: "Postdoctoral Researcher @ Sun Yat-sen University Mathematics Department (Zhuhai)",
  email: "matrix98@mail.ustc.edu.cn",
  photo: "/photo.jpg",
  bio: [
    "我叫戴天瑞（1998年出生），来自中国安徽省合肥市。",
    "我目前在寻找多模态、AI4Science、世界模型和高性能计算方面的岗位。欢迎联系！",
    "我当前的研究方向为反问题成像、图谱理论、高性能计算、基于深度学习的医学影像处理和基于数学物理先验的图像视频生成模型。同时，我对多模态、世界模型的研究非常感兴趣。",
  ],
  career: [
    {
      period: "2025–至今",
      position: "助理研究员",
      organization: "中山大学数学学院（珠海）",
      note: "合作导师：Davide Bianchi 副教授。研究涵盖反问题成像理论、建模与数值方法，以及基于深度学习的医学影像处理。",
    },
    {
      period: "2026–至今",
      position: "高性能数学库算子专家顾问",
      organization: "大湾区国家技术创新中心",
      note: "面向工业仿真的大规模稀疏矩阵求解：基于人工智能的优化方案落地与算子开发。",
    },
    {
      period: "2024–2025",
      position: "博士后研究员",
      organization: "佛罗伦萨大学",
      note: "合作导师：Elisa Francini 副教授、Sergio Vessella 教授。研究包括分段 Carleman 估计、含多边形夹杂物的 EIT 成像理论及 Lipschitz 稳定性分析。",
    },
  ],
  education: [
    {
      period: "2021–2024",
      degree: "应用数学博士",
      school: "巴黎西岱大学 · Jacques-Louis Lions 实验室（LJLL）",
      note: "导师：Yves Capdeboscq 教授。论文题为《参数重构问题与混合层析成像》。",
    },
    {
      period: "2019–2020",
      degree: "应用数学 M2",
      school: "巴黎第九大学（Paris Dauphine–PSL）",
      note: "导师：Yves Capdeboscq 教授。巴黎数学会 PGSM 硕士奖学金资助。",
    },
    {
      period: "2015–2019",
      degree: "数学与应用数学学士",
      school: "中国科学技术大学 · 少年班学院创新试点班",
      note: "导师：麻希南教授。",
    },
  ],
  copyrightYear: 2026,
};
