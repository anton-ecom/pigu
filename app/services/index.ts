export * from "./post-service.server";
export * from "./signal-service.server";
import { db } from "~/database";
import { EntryRepositoryImpl } from "~/infrastructure/repositories/entry-repository";
import { PostService } from "./post-service.server";

export const postService = new PostService(new EntryRepositoryImpl(db));
