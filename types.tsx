import { CodeTypeEnum } from './models/code';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Generate: undefined;
  Scan: undefined;
  // List: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
  ContactForm: undefined;
  URLForm: undefined;
  TextForm: undefined;
  QrGenerator: {
    value: string;
    type: CodeTypeEnum;
  };
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type TabThreeParamList = {
  TabThreeScreen: undefined;
};
