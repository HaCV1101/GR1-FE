export interface CVType {
  applyPosition: string;
  goals: string;
  contacts: {
    birthday: string;
    gender: string;
    address: string;
    phone: string;
    mail: string;
    github: string;
  };
  avatar: string;
  hobbies: string[];
  skills: {
    title: string;
    details: string[];
  }[];
  education: {
    university: string;
    specialized: string;
    graduationType: string;
    period: string;
  }[];
  experiences: {
    position: string;
    company: string;
    period: string;
  }[];
}

export interface Job {
  _id: string;
  address: string;
  career: string;
  company: string;
  info: string;
  jobType: string;
  name: string;
  numOfApplicants: number;
  recruitmentTime: string;
  require: JobRequire[];
  salary: number;
  tags: string[];
  contactPhone: string;
  contactEmail: string;
  contactName: string;
  updatedAt: string;
  createdAt: string;
}
interface JobRequire {
  title: string;
  skills: string[];
  _id: string;
}
export type User = {
  _id: string;
  role: "candidate";
  email: string;
  password: string;
  fullname: string;
  phone: string;
  address?: string;
  avatar?: string;
  tags: string[];
  cv?: string;
};
export type Company = {
  role: "company";
  _id: string;
  name: string;
  introCompany: string;
  email: string;
  phone: string;
  jobs: string[];
  contacts: {
    address: string;
    phone: string;
    email: string;
    homepage: string;
  };
  cover: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};
export interface SuitableJob {
  company: Company;
  jobs: Job[];
}

export interface SuitableCandidate extends Omit<User, "cv"> {
  cv: CVType;
}
