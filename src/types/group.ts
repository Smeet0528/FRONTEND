export interface RequestCreateGroupDto {
  title: string; //스터디 이름
  start_date: string; //시작일 "YYYY-MM-DD"
  end_date: string; //종료일 "YYYY-MM-DD"
  max_members: number; //모집 인원 (숫자)
  region: string; //지역
  content: string; //소개 내용
  day_of_week: string; //요일
  categoryNames: string[]; //카테고리 태그 배열
}

export interface ResponseCreateGroupDto {
  id: number;
  nickname: string;
  title: string;
  start_date: string;
  end_date: string;
  day_of_week: string;
  region: string;
  max_members: number;
  current_members: number;
  status: string;
  content: string;
  categories: string[];
  applicationStatus: string;
  roleOfCurrentUser: string;
}

export type UserRole = 'GUEST' | 'CREATOR' | 'MEMBER';
export type ApplicationStatus =
  | 'NONE'
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'CREATOR';

export interface GroupDetailResponse {
  current_members: number;
  id: number;
  nickname: string;
  title: string;
  start_date: string;
  end_date: string;
  day_of_week: string;
  region: string;
  max_members: number;
  status: string;
  content: string;
  categories: string[];
  applicationStatus: ApplicationStatus;
  roleOfCurrentUser: UserRole;
}

export interface RequestApplyGroupDto {
  message: string;
}

export interface ResponseApplyGroupDto {
  id: number;
  message: string;
  status: string;
  created_at: string;
  group: {
    id: number;
    title: string;
    status: string;
  };
}
