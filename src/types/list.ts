// 내 모임 리스트
export type MyStudyInfo = {
  current_members: number;
  id: number;
  title: string;
  start_date: Date;
  end_date: Date;
  max_members: number;
  status: string;
  region: string;
  content: string;
  categories: string[];
};

export type ResponseMyStudyList = MyStudyInfo[];

// 전체 모임 리스트
export type StudyInfo = {
  id: number;
  title: string;
  categories: string[];
  max_members: number;
  current_members: number;
};

export type ResponseTotoalStudyList = {
  items: StudyInfo[];
  hasNext: boolean;
  nextCursor: number;
};
