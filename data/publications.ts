export type PublicationLink = {
  label: string;
  href: string;
};

export type Publication = {
  id: string;
  title: string;
  venue: string;
  poster: string;
  thumbnail: string;
  advisors: string[];
  links: PublicationLink[];
  abstract: string[];
  highlight: string;
};

export const publications: Publication[] = [
  {
    id: "lipschitz-polygonal-inclusions-2026",
    title:
      "Lipschitz Stability in the Simultaneous Determination of Polygonal Inclusions and Constant Conductivities",
    venue: "arXiv preprint, 2026",
    poster: "/Lipschitz.png",
    thumbnail: "",
    advisors: [],
    links: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2604.27278",
      },
    ],
    abstract: [
      "We establish Lipschitz stability for identifying unknown polygonal inclusions together with their unknown constant conductivity values from the Dirichlet-to-Neumann map.",
      "We obtain Lipschitz estimates for the Hausdorff distance between inclusion boundaries and for the difference of the conductivity values.",
    ],
    highlight: "",
  },
  {
    id: "doubling-inequality-transmission-2025",
    title:
      "Doubling inequality and strong unique continuation for an elliptic transmission problem",
    venue: "Inverse Problems, 2025",
    poster: "/Doubling.png",
    thumbnail: "",
    advisors: [],
    links: [
      {
        label: "Paper",
        href: "https://doi.org/10.1088/1361-6420/ae16ce",
      },
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2505.23423",
      },
    ],
    abstract: [
      "We investigate the strong unique continuation property (SUCP) for elliptic equations with piecewise Lipschitz coefficients exhibiting jump discontinuities across a regular interface.",
      "We prove SUCP at the interface using a doubling inequality derived from a Carleman estimate with a singular weight.",
      "This result is a first step toward estimating the size of an unknown, merely measurable, inclusion inside a conductor from boundary measurements.",
    ],
    highlight: "",
  },
  {
    id: "parameter-reconstruction-hybrid-tomography-2024",
    title: "Parameter reconstruction problems and hybrid tomography",
    venue: "PhD Thesis, Université Paris Cité, 2024",
    poster: "/parameter.png",
    thumbnail: "",
    advisors: ["Prof. Yves Capdeboscq"],
    links: [
      {
        label: "Thesis",
        href: "https://theses.hal.science/tel-04924466v1",
      },
    ],
    abstract: [
      "Studies identification and reconstruction of parameters in boundary value problems for second-order linear PDEs using internal measurements.",
      "Treats elliptic, parabolic, and Maxwell models, emphasizing non-vanishing Jacobian and rotational constraints for hybrid tomography.",
      "Develops constructive solution families and density results via frozen-coefficient methods, unique continuation, and Whitney embedding techniques, including piecewise-regular coefficients.",
    ],
    highlight: "",
  },
  {
    id: "positive-jacobian-multiwave-2023",
    title:
      "Positive Jacobian constraints for elliptic boundary value problems with piecewise-regular coefficients arising from multi-wave inverse problems",
    venue: "Inverse Problems, 2023",
    poster: "/jacobian.png",
    thumbnail: "",
    advisors: [],
    links: [
      {
        label: "Paper",
        href: "https://doi.org/10.1088/1361-6420/aceea8",
      },
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2301.01574",
      },
    ],
    abstract: [
      "Multi-wave inverse problems combine imaging modalities; internal-data inversion typically requires Jacobians of the fields involved to be non-vanishing.",
      "Existing Jacobian constraints assume Hölder continuous coefficients, while embedded inclusions often lead to discontinuous piecewise-regular media.",
      "We show how to impose Jacobian constraints for divergence-form elliptic boundary value problems with piecewise-regular coefficients.",
    ],
    highlight: "",
  },
];
