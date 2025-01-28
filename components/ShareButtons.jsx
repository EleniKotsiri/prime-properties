'use client';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share";

const ShareButtons = ({ property }) => {
  // The property's url to share
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
    <h3 className="text-xl font-bold text-center pt-2">Share This Property</h3>
    <div className="flex gap-3 justify-center pb-5">
      <FacebookShareButton url={shareUrl} quote={property.name} hashtag={`#${property.type.replace(/\s/g, '')}ForRent`}> {/* Remove spaces for the hashtag using regex */}
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={property.name} hashtags={[`${property.type.replace(/\s/g, '')}ForRent`]}> {/* Remove spaces for the hashtag using regex */}
        <TwitterIcon size={40} round={true} />
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} title={property.name}>
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>
      <EmailShareButton url={shareUrl} subject={`${property.name} for sale`} body={`Check out this property listing: `}>
        <EmailIcon size={40} round={true} />
      </EmailShareButton>

    </div>
    </>
  );
};
export default ShareButtons;