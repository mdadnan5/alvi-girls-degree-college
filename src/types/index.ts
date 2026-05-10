export interface ICourse {
  _id: string;
  title: string;
  description: string;
  duration: string;
  fees: string;
  eligibility: string;
  image: string;
  createdAt: string;
}

export interface IFaculty {
  _id: string;
  name: string;
  designation: string;
  department: string;
  image: string;
  socialLinks: { linkedin: string; twitter: string; email: string };
  createdAt: string;
}

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  location: string;
  createdAt: string;
}

export interface INotice {
  _id: string;
  title: string;
  fileUrl: string;
  createdAt: string;
}

export interface IGallery {
  _id: string;
  image: string;
  category: string;
  createdAt: string;
}

export interface IAdmission {
  _id: string;
  studentName: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  createdAt: string;
}
