import { Accordion, Typography } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import { marked } from "marked";

async function OfferDetailsDescription({ description, cities, hotelName, price }) {
  const html =
    description?.length > 0 &&
    marked(description, { headerIds: false, mangle: false });

  return (
    <>
      <Accordion className="border-t border-b border-[#E0E1E1]">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="bg-secondary py-1"
        >
          <Typography className="font-bold xl:text-[1.1rem] text-base pl-4">
            Description
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {html ? (
            <article
              dangerouslySetInnerHTML={{ __html: html }}
              className="xl:text-base xl:leading-[28px] text-[0.9rem] leading-[24px]  w-full"
            />
          ) : (
            <article>{description}</article>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion className="border-t border-b border-[#E0E1E1]">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1b-content"
          id="panel1b-header"
          className="bg-secondary py-1"
        >
          <Typography className="font-bold xl:text-[1.1rem]  text-base  pl-4">
            Additional Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="p-0">
          <div className="flex p-5 border-b-4 border-secondary">
            <p className="font-bold w-40 xl:text-base text-[0.9rem]">City</p>
            <p className=" xl:text-base text-[0.9rem]">{cities}</p>
          </div>
          <div className="flex p-5 border-b-4 border-secondary">
            <p className="font-bold w-40 xl:text-base text-[0.9rem]">Hotel</p>
            <p className=" xl:text-base text-[0.9rem]">{hotelName}</p>
          </div>
          <div className="flex p-5 ">
            <p className="font-bold w-40  xl:text-base text-[0.9rem]">Price</p>
            <p className=" xl:text-base text-[0.9rem]">{price}</p>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default OfferDetailsDescription;
