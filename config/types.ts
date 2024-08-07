import type socialIcons from "../assets/socialIcons";

export type Site = {
  website: string;
  author: string;
  desc: string;
  avatar :string;
  title: string;
  postPerPage: number;
};

export type SocialObjects = {
  name: keyof typeof socialIcons;
  href: string;
  active: boolean;
  linkTitle: string;
}[];
