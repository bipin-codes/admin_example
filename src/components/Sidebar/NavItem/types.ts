import { IconType } from 'common/Icon';

export interface LinkDetail {
    label: string;
    to: string;
    icon: IconType;
}
export interface NavDetails {
    item: LinkDetail;
    hoverEffect: boolean;
    icon?: IconType;
}
