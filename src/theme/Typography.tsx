import React from 'react'

type Variant =
	| 'body1'
	| 'body2'
	| 'button'
	| 'caption'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'subtitle1'
	| 'subtitle2'
	| 'heading1'

export interface TypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
	text: string
	as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'
	variant?: Variant
}

export default function Typography({ text, variant = 'body1', as = 'p', ...props }: TypographyProps) {
	const VARIANT_CLASSNAME_MAP: Record<Variant, string> = {
		body1: 'text-base font-normal',
		body2: 'text-sm font-normal',
		button: 'text-sm font-medium',
		caption: 'text-xs font-normal',
		h1: 'text-2xl font-normal',
		h2: 'text-2xl font-light',
		h3: 'text-xl font-light',
		h4: 'text-lg font-light',
		h5: 'text-base font-light',
		h6: 'text-sm font-light',
		subtitle1: 'text-base font-medium',
		subtitle2: 'text-sm font-medium',
		heading1: 'text-7xl font-black',
	}

	return React.createElement(
		as,
		{
			...props,
			className: [VARIANT_CLASSNAME_MAP[variant], props.className].join(' '),
		},
		text
	)
}
