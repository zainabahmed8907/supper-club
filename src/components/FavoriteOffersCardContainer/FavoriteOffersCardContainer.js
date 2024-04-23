import Image from "next/image";
import FavoriteOfferCard from "../FavoriteOfferCard/FavoriteOfferCard";
import FavoriteOfferCardMobile from "../FavoriteOfferCardMobile/FavoriteOfferCardMobile";
import NoFavoriteOffer from "public/images/dashboard/noFavoriteOffer.svg";
import DeleteItemModal from "../Modals/DeleteItemModal";
import { useState } from "react";
import CancelDrawerMobile from "../MobileBottomDrawers/CancelBookingDrawer";
import CancelFavImg from  "/public/images/offers/cancel-favorite.svg";


function FavoriteOffersCardContainer({ favoriteOffers, deleteOffer }) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const [id, setid] = useState("");

  const [deleteOfferOpen, setDeleteOfferOpen]=useState(false);

  const handleDeleteOfferOpen=()=>setDeleteOfferOpen(true);
  const handleDeleteOfferClose=()=>setDeleteOfferOpen(false);




  return (
    <div
      className="bg-white min-h-[780px] h-[780px] overflow-y-auto overflow-x-hidden
      2xl:w-[66rem] lg:w-[60rem] lg:-mt-8 xs:m-atuo xss:m-auto xs:w-[24rem] xss:w-[21rem]  lg:ml-4 "
    >
      <div className=" xl:px-6 py-5 lg:block hidden">
        {favoriteOffers?.length > 0 ? (
          favoriteOffers?.map((favoriteOffer, index) => {
            const img = favoriteOffer?.image?.formats?.small?.url;
            const description = favoriteOffer?.description;
            const logo = favoriteOffer?.restaurant?.logo;
            const restaurant = favoriteOffer?.restaurant?.name;
            return (
              <div key={favoriteOffer?.id}>
                <div onClick={() => setid(favoriteOffer?.id)}>
                  <FavoriteOfferCard
                    img={img}
                    description={description}
                    logo={logo}
                    restaurant={restaurant}
                    handleOpen={handleOpen}
                    id={favoriteOffer?.id}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="xl:h-[40rem] flex flex-col justify-center items-center">
            <Image
              src={NoFavoriteOffer}
              width={500}
              height={200}
              alt="no offer"
            />
          </div>
        )}
      </div>
      <div className="flex gap-3 lg:hidden py-6 justify-center pl-2 flex-wrap">
        {favoriteOffers?.length > 0 ? (
          favoriteOffers?.map((favoriteOffer) => {
            const img = favoriteOffer?.image?.formats?.small?.url;
            const description = favoriteOffer?.description;
            const logo = favoriteOffer?.restaurant?.logo;
            const restaurant = favoriteOffer?.restaurant?.name;

            return (
              <div key={favoriteOffer?.id}>
                <div onClick={()=>{
                  setid(favoriteOffer?.id);
                }}>
                  <FavoriteOfferCardMobile
                    img={img}
                    description={description}
                    logo={logo}
                    restaurant={restaurant}
                    id={favoriteOffer?.id}
                    handleOpen={handleDeleteOfferOpen}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center items-center">
            <Image
              src={NoFavoriteOffer}
              className="lg:w-1/2 lg:h-1/2 w-full"
              width={100}
              height={100}
              alt="no offer"
            />
          </div>
        )}
      </div>

      {deleteOfferOpen && (
        <CancelDrawerMobile
           open={deleteOfferOpen}
           toggleDrawer={handleDeleteOfferClose}
           image={CancelFavImg}
           handleClose={handleDeleteOfferClose}
           cancelOffer={deleteOffer}
           favOfferId={id}
        />
      )}
      
      {modalOpen && (
        <DeleteItemModal
          open={modalOpen}
          handleClose={handleClose}
          image={CancelFavImg}
          id={id}
          deleteFavOffer={deleteOffer}
        />
      )}
    </div>
  );
}

export default FavoriteOffersCardContainer;
