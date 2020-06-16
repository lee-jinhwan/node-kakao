import { ChatUser, UserInfo, OpenChatUserInfo, ChatUserInfo } from "../user/chat-user";
import { Long } from "bson";
import { ChannelType } from "./channel-type";
import { EventEmitter } from "events";
import { Chat, FeedChat } from "../chat/chat";
import { MessageTemplate } from "../chat/template/message-template";
import { ChatContent } from "../chat/attachment/chat-attachment";
import { ChatFeed } from "../chat/chat-feed";
import { LocoClient } from "../../client";
import { OpenMemberType } from "../open/open-link-type";
import { PrivilegeMetaContent, ProfileMetaContent, TvMetaContent, TvLiveMetaContent, LiveTalkCountMetaContent, GroupMetaContent, ChannelMetaStruct } from "../struct/channel-meta-struct";
import { ChannelSettings } from "./channel-settings";
import { OpenLinkChannel } from "../open/open-link";
import { RequestResult } from "../request/request-result";
import { OpenLinkReactionInfo } from "../struct/open/open-link-struct";

/*
 * Created on Fri Nov 01 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export interface ChatChannel<I extends ChatUserInfo = ChatUserInfo> extends EventEmitter {

    readonly Client: LocoClient;

    readonly LastChat: Chat | null;

    readonly Id: Long;

    readonly Type: ChannelType;

    readonly Name: string;

    readonly RoomImageURL: string;
    readonly RoomFullImageURL: string;

    readonly ClientName: string;

    readonly ClientRoomImageURL: string;
    readonly ClientRoomFullImageURL: string;

    readonly IsFavorite: boolean;

    readonly PushAlert: boolean;

    readonly UserInfoList: I[];

    readonly ChannelMetaList: ChannelMetaStruct[];

    hasUserInfo(id: Long): boolean;

    getUserInfo(user: ChatUser): I | null;

    getUserInfoId(id: Long): I | null;

    isOpenChat(): boolean;

    markChannelRead(lastWatermark: Long): Promise<void>;

    sendText(...textFormat: (string | ChatContent)[]): Promise<Chat | null>;
    
    sendTemplate(template: MessageTemplate): Promise<Chat | null>;

    leave(block?: boolean): Promise<RequestResult<boolean>>;

    setChannelSettings(settings: ChannelSettings): Promise<RequestResult<boolean>>;

    setTitleMeta(title: string): Promise<RequestResult<boolean>>;

    setNoticeMeta(notice: string): Promise<RequestResult<boolean>>;

    setPrivilegeMeta(content: PrivilegeMetaContent): Promise<RequestResult<boolean>>;

    setProfileMeta(content: ProfileMetaContent): Promise<RequestResult<boolean>>;

    setTvMeta(content: TvMetaContent): Promise<RequestResult<boolean>>;

    setTvLiveMeta(content: TvLiveMetaContent): Promise<RequestResult<boolean>>;

    setLiveTalkCountMeta(content: LiveTalkCountMetaContent): Promise<RequestResult<boolean>>;

    setGroupMeta(content: GroupMetaContent): Promise<RequestResult<boolean>>;

    on(event: 'message', listener: (chat: Chat) => void): this;
    on(event: 'join', listener: (newUser: ChatUser, chat: FeedChat) => void): this;
    on(event: 'left', listener: (leftUser: ChatUser, chat: FeedChat) => void): this;

    once(event: 'message', listener: (chat: Chat) => void): this;
    once(event: 'join', listener: (newUser: ChatUser, chat: FeedChat) => void): this;
    once(event: 'left', listener: (leftUser: ChatUser, chat: FeedChat) => void): this;

}

export interface MemoChatChannel<I extends ChatUserInfo = ChatUserInfo> extends ChatChannel<I> {

    

}

export interface OpenChatChannel<I extends ChatUserInfo = ChatUserInfo> extends ChatChannel<I> {

    readonly LinkId: Long;
    readonly OpenToken: number;

    readonly ClientUserInfo: ChatUserInfo;

    getOpenLink(): OpenLinkChannel;

    canManageChannel(user: ChatUser): boolean;

    canManageChannelId(userId: Long): boolean;

    isManager(user: ChatUser): boolean;

    isManagerId(userId: Long): boolean;

    getMemberType(user: ChatUser): OpenMemberType;

    getMemberTypeId(userId: Long): OpenMemberType;

    isOpenChat(): true;

    kickMember(user: ChatUser): Promise<RequestResult<boolean>>;
    kickMemberId(userId: Long): Promise<RequestResult<boolean>>;

    deleteLink(): Promise<RequestResult<boolean>>;

    hideChat(chat: Chat): Promise<RequestResult<boolean>>;
    hideChatId(logId: Long): Promise<RequestResult<boolean>>;

    changeToMainProfile(): Promise<RequestResult<boolean>>;
    changeToKakaoProfile(nickname: string, profilePath: string): Promise<RequestResult<boolean>>;
    changeToLinkProfile(profileLinkId: Long): Promise<RequestResult<boolean>>;

    setOpenMemberType(user: ChatUser, memberType: OpenMemberType): Promise<RequestResult<boolean>>;

    setOpenMemberTypeId(userId: Long, memberType: OpenMemberType): Promise<RequestResult<boolean>>;

    requestReactionInfo(): Promise<RequestResult<OpenLinkReactionInfo>>;
    setReacted(reacted: boolean): Promise<RequestResult<boolean>>;

    on(event: 'message', listener: (chat: Chat) => void): this;
    on(event: 'join', listener: (newUser: ChatUser, chat: FeedChat) => void): this;
    on(event: 'left', listener: (leftUser: ChatUser, chat: FeedChat) => void): this;

    once(event: 'message', listener: (chat: Chat) => void): this;
    once(event: 'join', listener: (newUser: ChatUser, chat: FeedChat) => void): this;
    once(event: 'left', listener: (leftUser: ChatUser, chat: FeedChat) => void): this;

}