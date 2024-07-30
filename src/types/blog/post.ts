import { ObjectId } from 'mongodb';

// Enum for hero types
export enum HeroType {
    LowImpact = 'lowImpact',
    // Add other hero types if needed
}

// Type for rich text children
export type RichTextChild = {
    text: string;
    bold?: boolean;
};

// Type for rich text
export type RichText = {
    children: RichTextChild[];
    type?: string;
};

// Type for links
export type Link = {
    type: string;
    reference: string | null;
    url: string;
    label: string;
    appearance: string;
};

// Type for hero
export type Hero = {
    type: HeroType;
    richText: RichText[];
    links: any[]; // You might want to define a more specific type for links
    media: any | null; // Define a specific type for media if possible
};

// Type for layout column
export type LayoutColumn = {
    size: string;
    richText: RichText[];
    link: Link;
    id: string;
};

// Type for layout
export type Layout = {
    columns: LayoutColumn[];
    id: string;
    blockType: string;
};

// Type for meta
export type Meta = {
    title: string;
    description: string;
    image?: string | ObjectId;
};

// Main Post type
export type BlogPost = {
    _id: string | ObjectId;
    title: string;
    categories: string[] | string; // It can be an array of strings or a single string
    publishedAt: string | Date;
    authors: string[] | ObjectId[];
    hero: Hero;
    layout: Layout[];
    enablePremiumContent: boolean;
    premiumContent: Layout[];
    relatedPosts: string[] | ObjectId[];
    slug: string;
    meta: Meta;
    _status: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    __v: number;
    populatedAuthors?: any[]; // Define a more specific type if you have information about the structure
};