/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Courses: undefined;
  Simulator: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type CourseTableProps = {
  courses: Array<CourseData>
};

export type CourseData = {
  id: string;
  title: string;
  quarter: number;
  credits: number;
  section: string;
  hours: number;
};

export type SimulatorFormProps = {
  program: Array<SimulatorCourseData>
};

export type SimulatorCourseData = {
  id: string;
  title: string;
  quarter: number;
  credits: number;
  section: string;
  hours: number;
  accessible: boolean;
  passed: boolean;
};

export enum Section {
  ALL = "ALL",
  MANAGEMENT = "MANAGEMENT",
  NETWORK = "NETWORK",
  INDUSTRIAL = "INDUSTRIAL",
}
