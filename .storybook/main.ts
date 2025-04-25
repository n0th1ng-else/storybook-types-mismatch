import {dirname, join} from 'path'
import type {StorybookConfig as WCfg} from '@storybook/react-webpack5'
import type {RsbuildConfig} from '@rsbuild/core'
import {pluginReact} from '@rsbuild/plugin-react'
import {pluginMdx} from '@rsbuild/plugin-mdx'
import type {StorybookConfig as RCfg} from 'storybook-react-rsbuild'

const isRspack = process.env.RSPACK === 'true'

function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, 'package.json')))
}

const buildMdxPath = (path: string) => `${path}**/*.mdx`
const buildJsPath = (path: string) => `${path}**/*.stories.tsx`

const configW: WCfg = {
	stories: [
		buildMdxPath('../src/'),
		buildJsPath('../src/'),
	],

	addons: [
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@storybook/addon-backgrounds'),
		getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
	],

	docs: {},

	framework: {
		name: getAbsolutePath('@storybook/react-webpack5'),
		options: {
			builder: {},
		},
	},

	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
}

const configR: RCfg = {
	stories: [
		buildMdxPath('../src/'),
		buildJsPath('../src/'),
	],

	addons: [
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@storybook/addon-backgrounds'),
	],

	docs: {},

	framework: 'storybook-react-rsbuild',

	rsbuildFinal: (cfg: RsbuildConfig): RsbuildConfig => {
		cfg.plugins = [pluginReact(), pluginMdx()]
		return cfg
	},

	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
}

export default isRspack ? configR : configW