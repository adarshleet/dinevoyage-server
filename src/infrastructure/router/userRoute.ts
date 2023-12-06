import express from 'express'
const route = express.Router()
import { protect } from '../middlewares/userAuth'




//----------------------------------------------------------------------------------------------------------

import userController from '../../adapter/userController'
import userRepository from '../repository/userRepository'
import Userusecase from '../../usecase/userUsecase'
import TwilioService from '../utils/twilio'
import Encrypt from '../utils/hashPassword'
import JwtCreate from '../utils/jwtCreate'


const twilio =  new TwilioService()
const encrypt = new Encrypt()
const jwtCreate = new JwtCreate()


const repository = new userRepository()
const usecase = new Userusecase(repository,twilio,encrypt,jwtCreate)
const controller = new userController(usecase)

route.post('/api/user/signup',(req,res)=>controller.signUp(req,res))
route.post('/api/user/otpVerify',(req,res)=>controller.otpVerification(req,res));
route.post('/api/user/login',(req,res)=>controller.login(req,res))
route.get('/api/user/logout',(req,res)=>controller.userLogout(req,res))

route.get('/api/user/findUser',(req,res)=>controller.findUser(req,res))
route.get('/api/user/findUserById',(req,res)=>controller.findUserById(req,res))
route.put('/api/user/changeName',(req,res)=>controller.changeName(req,res))
route.post('/api/user/verifyNewMobile',(req,res)=>controller.verifyNewMobile(req,res))
route.put('/api/user/changeMobile',(req,res)=>controller.changeMobile(req,res))
route.put('/api/user/changePassword',(req,res)=>controller.changePassword(req,res))

route.get('/api/user/restaurantsToDisplay',(req,res)=>controller.restaurantsToDisplay(req,res))
route.get('/api/user/singleRestaurant',(req,res)=>controller.singleRestaurant(req,res))



//-----------------------------------------------------------------------------------------------------------


import KitchenController from '../../adapter/kitchenController'
import KitchenUsecase from '../../usecase/kitchenUsecase'
import kitchenRepository from '../repository/kitchenRepository'
import CloudinaryM from '../utils/cloudinary'

const cloudinaryM = new CloudinaryM()
const kitchenRepo = new kitchenRepository()
const kitchenUsecase = new KitchenUsecase(kitchenRepo,cloudinaryM)
const kitchenController = new KitchenController(kitchenUsecase)


route.get('/api/user/allKitchenItems',(req,res)=>kitchenController.allItems(req,res))

route.get('/api/user/kitchenItems',(req,res)=>kitchenController.allKitchenItems(req,res))

//------------------------------------------------------------------------------------------------------------

import bookingRepository from '../repository/bookingRepository'
import BookingController from '../../adapter/bookingController'
import BookingUsecase from '../../usecase/bookingUsecase'
import Session from '../repository/session'
import StripePayment from '../utils/stripe'

const bookingRepo = new bookingRepository()
const stripe = new StripePayment()
const bookingUsecase = new BookingUsecase(bookingRepo,stripe)
const session = new Session()
const bookingController = new BookingController(bookingUsecase,session)


route.get('/api/user/seatDetails',(req,res)=>bookingController.dateSeatDetails(req,res))
route.post('/api/user/tableCounts',(req,res)=>bookingController.tableCounts(req,res))

route.post('/api/user/confirmBooking',(req,res)=>bookingController.confirmBooking(req,res))
route.post('/api/user/proceedToPayment',(protect),(req,res)=>bookingController.makePayment(req,res))
route.get('/api/user/allbookings',(protect),(req,res)=>bookingController.userBookings(req,res))
route.put('/api/user/cancelBooking',(protect),(req,res)=>bookingController.userBookingCancellation(req,res))

route.post('/api/user/payWithWallet',(protect),(req,res)=>bookingController.bookingWithWallet(req,res))

//--------------------------------------------------------------------------------------------------------//

//restaurant details for user
import restaurantRepository from '../repository/restaurantRepository'
import restaurantController from '../../adapter/restaurantController'
import RestaurantUsecase from '../../usecase/restaurantUsecase'
import Cloudinary from '../utils/cloudinary'
const cloudinary = new Cloudinary()

const restaurantRepo = new restaurantRepository()
const restaurantusecase = new RestaurantUsecase(restaurantRepo,cloudinary)
const restaurantControll = new restaurantController(restaurantusecase)


route.get('/api/user/search',(req,res)=>restaurantControll.searchRestaurants(req,res))
route.post('/api/user/filterRestaurants',(req,res)=>restaurantControll.filterRestaurants(req,res))

//-----------------------------------------------------------------------------------------------------------//

import CouponRepository from '../repository/couponRepository'
import CouponController from '../../adapter/couponController'
import CouponUsecase from '../../usecase/couponUsecase'

const couponRepo = new CouponRepository()
const couponUsecase = new CouponUsecase(couponRepo)
const couponController = new CouponController(couponUsecase)


route.get('/api/user/couponsToShow',(req,res)=>couponController.couponToShow(req,res))

//-------------------------------------------------------------------------------------------------------------//
import userConversationRepository from '../repository/userConversationRepository'
import UserConversationController from '../../adapter/userConversationController'
import UserConversationUsecase from '../../usecase/userConversationUsercase'

const userConversationRepo = new userConversationRepository()
const userConversationUsercase = new UserConversationUsecase(userConversationRepo)
const userConversationController = new UserConversationController(userConversationUsercase)


route.post('/api/user/newConversation',(protect),(req,res)=>userConversationController.newConversation(req,res))
route.get('/api/user/getConversations',(protect),(req,res)=>userConversationController.getConversations(req,res))
route.get('/api/user/getConversation',(protect),(req,res)=>userConversationController.getConversation(req,res))


//----------------------------------------------------------------------------------------------------------------//

import userMessageRepository from '../repository/userMessage'
import UserMessageController from '../../adapter/userMessageController'
import UserMessageUsecase from '../../usecase/userMessageUsecase'

const userMessageRepo = new userMessageRepository
const userMessageUsecase = new UserMessageUsecase(userMessageRepo)
const userMessageController = new UserMessageController(userMessageUsecase)

route.post('/api/user/newMessage',(protect),(req,res)=>userMessageController.newMessage(req,res))
route.get('/api/user/getMessages',(protect),(req,res)=>userMessageController.getMessages(req,res))


export default route
