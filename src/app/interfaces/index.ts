export enum GalleryTypeEnum {
  GALLERY, SEGMENT, BACKGROUND
}

export interface IGallery {
  _id: string;
  name: string;
  image: string;
  type: GalleryTypeEnum;
  userID: string;
}