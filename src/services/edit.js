import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, ButtonGroup } from '@wordpress/components';
import './editor.scss';

const normalizeUrl = (url) => {
	if (!url) return '';
	try {
		const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(url);
		return new URL(hasProtocol ? url : `https://${url}`).toString();
	} catch {
		return url;
	}
};

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { services = [] } = attributes;
	const blockProps = useBlockProps();

	const updateService = (index, fields) => {
		const updated = [...services];
		updated[index] = { ...updated[index], ...fields };
		setAttributes({ services: updated });
	};

	const removeService = (index) => {
		const updated = [...services];
		updated.splice(index, 1);
		setAttributes({ services: updated });
	};

	const addService = () => {
		setAttributes({
		services: [
			...services,
			{
				image: null,
				title: '',
				link: '',
				target: '_self',
			},
		],
		});
	};

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Service Boxes', 'your-textdomain')} initialOpen={true}>
				<Button isPrimary onClick={addService} style={{ marginBottom: '1rem' }}>
					Add Service Box
				</Button>

				{services.map((svc, index) => (
					<div
					key={index}
					style={{
						border: '1px solid #ddd',
						padding: '0.75rem',
						marginBottom: '1rem',
						borderRadius: '6px',
					}}
					>
					<strong>{`Service #${index + 1}`}</strong>

					<div style={{ marginTop: '0.5rem' }}>
						<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) =>
							updateService(index, {
								image: {
								id: media.id,
								url: media.url,
								alt: media.alt,
								caption: media.caption || '',
								},
							})
							}
							allowedTypes={['image']}
							value={svc.image?.id}
							render={({ open }) => (
							<Button onClick={open} isSecondary style={{ marginBottom: '0.5rem' }}>
								{svc.image ? 'Change Image' : 'Select Image'}
							</Button>
							)}
						/>
						</MediaUploadCheck>
						{svc.image && (
						<div style={{ marginBottom: '0.5rem' }}>
							<img
							src={svc.image.url}
							alt={svc.image.alt || ''}
							style={{ width: '100%', maxHeight: '100px', objectFit: 'cover' }}
							/>
						</div>
						)}
					</div>

					<TextControl
						label="Title"
						value={svc.title}
						onChange={(val) => updateService(index, { title: val })}
						placeholder="Service title"
					/>

					<TextControl
						label="URL"
						value={svc.link}
						onChange={(val) => updateService(index, { link: val })}
						placeholder="https://example.com"
					/>

					<ButtonGroup style={{ marginTop: '0.5rem' }}>
						<Button
						isSecondary
						onClick={() =>
							updateService(index, {
							target: svc.target === '_self' ? '_blank' : '_self',
							})
						}
						>
						Open {svc.target === '_self' ? 'same tab' : 'in new tab'}
						</Button>
						<Button isDestructive onClick={() => removeService(index)}>
						Remove
						</Button>
					</ButtonGroup>
					</div>
				))}
				</PanelBody>
			</InspectorControls>

			{/* Editor preview */}
			<div id="section-services" className="section">
				<div className="wrapper">
				<div className="container">
					<div className="info">
					<h2>Services</h2>
					</div>
					<div className="boxes">
					{services.map((svc, i) => (
						<section key={i}>
						<figure>
							{svc.image && <img src={svc.image.url} alt={svc.image.alt || ''} />}
							<figcaption>
							<p>{svc.title || `Service ${i + 1}`}</p>
							</figcaption>
						</figure>
						{svc.link ? (
							<a
							href={svc.link}
							target={svc.target}
							rel={svc.target === '_blank' ? 'noopener noreferrer' : undefined}
							></a>
						) : (
							<span style={{ display: 'none' }} />
						)}
						</section>
					))}
					</div>
				</div>
				</div>
			</div>
		</div>
	);
}
