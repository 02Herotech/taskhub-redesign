export interface Author {
    id: string;
    name: string;
    roles: string[];
    email: string;
    createdAt: string;
    updatedAt: string;
    loginAttempts: number;
}

interface Image {
    id: string;
    alt: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    focalX: number;
    focalY: number;
    createdAt: string;
    updatedAt: string;
    url: string;
}

export interface Category {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
}

export interface ChildText {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
}

export interface PostContent {
    children: ChildText[];
    relationTo?: string;
    type?: 'paragraph' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'ul' | 'ol' | 'li' | 'link' | 'upload' | 'blockquote' | 'indent' | 'code';
    value?: Image;
    url?: string; // For links
}

export interface RelatedPost {
    id: string;
    title: string;
    postContent?: PostContent[];
    image: Image;
    category: Category;
    publishedAt: string;
    authors: Author[];
    relatedPosts?: RelatedPost[];
    slug: string;
    meta: Meta;
    _status: string;
    createdAt: string;
    updatedAt: string;
    populatedAuthors: any[];
    readTime: string;
    postSummary: string;
}

interface Meta {
    title?: string;
    description?: string;
}

export interface BlogPost {
    id: string;
    title: string;
    postContent?: PostContent[];
    image: Image;
    category: Category;
    publishedAt: string;
    authors: Author[];
    relatedPosts?: RelatedPost[];
    slug: string;
    meta: Meta;
    _status: string;
    createdAt: string;
    updatedAt: string;
    readTime: string;
    populatedAuthors: any[];
    postSummary: string;
}

export interface BlogPostsResponse {
    docs: BlogPost[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

export interface CategoriesResponse {
    docs: Category[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}
