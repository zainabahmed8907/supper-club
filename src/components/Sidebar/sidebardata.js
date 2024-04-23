import Categories from "/public/images/drawer/categories.svg";
import FavoriteOffers from "/public/images/drawer/favorite-offers.svg";
import ReferAFriend from "/public/images/drawer/refer-a-friend.svg";
import BookingCredits from "/public/images/drawer/booking-credits.svg";
import CalendarTick from "/public/images/drawer/calendar-tick.png";

const sidebarData = [
  {
    id: 1,
    path: "/profile",
    itemName: "Manage Account",
    image: Categories,
  },
  {
    id: 2,
    path: "/bookings?type=upcoming",
    itemName: "My Bookings",
    image: CalendarTick,
  },
  {
    id: 3,
    path: "/wallet",
    itemName: "Booking Credits",
    image: BookingCredits,
  },
  {
    id: 4,
    path: "",
    itemName: "Refeer a Friend",
    image: ReferAFriend,
  },
  {
    id: 5,
    path: "/favorite_offers",
    itemName: "Favorite Offers",
    image: FavoriteOffers,
  },
];
export default sidebarData;
