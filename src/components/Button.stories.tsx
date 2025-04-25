import type { Meta, StoryFn } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
    component: Button,
};

export default meta;

export const Default: StoryFn<typeof Button> = args => <Button />

export const Disabled: StoryFn<typeof Button> = args => <Button />