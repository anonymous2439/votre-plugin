import {
  BlockControls,
  InspectorControls,
} from "@wordpress/block-editor";
import {
  PanelBody,
  PanelRow,
  SelectControl,
  TextControl
} from "@wordpress/components";
import {Image, MediaToolbar} from "@10up/block-components";

export default function MediaInspectorControl( props ) {
  const setAttributes = props.setAttributes;
  const {
    mediaType, youtubeVideoID, imageType, imageID, caption
  } = props.attributes;

  const handleImageSelection = imageObj => {
    setAttributes({
      imageID: imageObj.id,
      imageURL: imageObj.sizes.block_content_media_image ? imageObj.sizes.block_content_media_image.url : imageObj.url,
      imageSmallURL: imageObj.sizes.block_content_media_small_image ? imageObj.sizes.block_content_media_small_image.url : imageObj.url,
    })
  }

  const removeImage = () => setAttributes({imageID: null, imageURL: null, imageSmallURL: null});

  return (
    <>
      <InspectorControls>
        <PanelBody
          title="Media setting"
          initialOpen={true}
        >
          <PanelRow>
            <p>Media Type:</p>
            <SelectControl
              options={[
                { label: 'Image', value: 'image' },
                { label: 'Video', value: 'video' },
              ]}
              value={ mediaType }
              onChange={(mediaType) => setAttributes({ mediaType })}
            />
          </PanelRow>

          {mediaType == 'image' &&
            <PanelRow>
              <p>Image Type:</p>
              <SelectControl
                options={[
                  { label: 'Cover', value: 'cover' },
                  { label: 'Contain', value: 'contain' },
                ]}
                value={ imageType }
                onChange={(imageType) => setAttributes({ imageType })}
              />
            </PanelRow>
          }

          { mediaType == 'image' &&
            <PanelRow>
              <BlockControls>
                <MediaToolbar id={imageID} onSelect={ handleImageSelection } isOptional={true} onRemove={removeImage} />
              </BlockControls>
              <Image id={imageID} size="block_content_media_image" onSelect={handleImageSelection} />
            </PanelRow>
          }

          {mediaType == 'video' &&
            <PanelRow>
              <TextControl
                label="Youtube Video ID"
                value={youtubeVideoID}
                onChange={(youtubeVideoID) => setAttributes({ youtubeVideoID })}
              />
            </PanelRow>
          }

          <TextControl
            label="Caption"
            className={"panel-full"}
            value={caption}
            onChange={(caption) => setAttributes({caption})}
          />
        </PanelBody>
      </InspectorControls>
    </>
  )
}