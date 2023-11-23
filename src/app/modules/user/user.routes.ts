import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getUserById);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);
router.get('/:userId/orders', UserController.getUserOrders);
router.get('/:userId/orders/total-price', UserController.getTotalOrderPrice);

export const UserRoutes = router;
