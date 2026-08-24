export const ChannelType = {
    API: 'API',
    UI: 'UI',
} as const;

export type ChannelTypeValue = (typeof ChannelType)[keyof typeof ChannelType];
