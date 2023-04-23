import axios from 'axios';

const NOTIFICATION_API_BASE_URL = "http://localhost:8080/api/v1/notifications";

class NotificationService {

    createNotification(notification) {
        return axios.post(NOTIFICATION_API_BASE_URL, notification);
    }

    deleteNotification(idNotification) {
        return axios.delete(NOTIFICATION_API_BASE_URL + '/' + idNotification);
    }

    getNotificationsOfDoctor(idDoctor, order) {
        return axios.get(NOTIFICATION_API_BASE_URL + '/' + idDoctor + '/' + order);
    }

    getNotificationById(idNotification) {
        return axios.get(NOTIFICATION_API_BASE_URL + '/' + idNotification + '/view');
    }

}

export default new NotificationService()