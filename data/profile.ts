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
  bioEn: string[];
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
  bioEn: [
    "I am Tianrui Dai (born in 1998), from Hefei, Anhui, China.",
    "I am looking for jobs in AIGC, AI4Science, world models, and high-performance computing. Feel free to get in touch.",
    "My research covers inverse problems, imaging, graph theory, high-performance computing, deep-learning-based medical image processing, and generative models for images and video grounded in mathematical and physical priors.",
  ],
  career: [
    {
      period: "2025–至今",
      position: "博士后研究员",
      organization: "中山大学数学学院（珠海）",
      note: "合作导师：Davide Bianchi 副教授。研究涵盖反问题成像理论、建模与数值方法，以及基于深度学习的医学影像处理。",
    },
    {
      period: "2026–至今",
      position: "高性能数学库兼职专家顾问",
      organization: "粤港澳大湾区国家技术创新中心",
      note: "面向工业仿真的大规模稀疏矩阵求解：基于人工智能的优化方案落地与算子开发。",
    },
    {
      period: "2024–2025",
      position: "Postdoctoral Researcher",
      organization: "Università di Firenze",
      note: "Collaborators: Prof Elisa Francini and Prof Sergio Vessella. Research includes piecewise Carleman estimates, EIT imaging theory with polygonal inclusions, and Lipschitz stability analysis.",
    },
  ],
  education: [
    {
      period: "2021–2024",
      degree: "应用数学博士",
      school: "Université Paris Cité · Laboratoire Jacques-Louis Lions （LJLL）",
      note: "Advisor: Prof Yves Capdeboscq 。",
    },
    {
      period: "2019–2020",
      degree: "应用数学硕士",
      school: "Université Paris Dauphine PSL",
      note: "Advisor: Prof Yves Capdeboscq 。",
    },
    {
      period: "2015–2019",
      degree: "数学与应用数学学士",
      school: "中国科学技术大学 · 少年班学院",
      note: "导师：麻希南教授。",
    },
  ],
  copyrightYear: 2026,
};
