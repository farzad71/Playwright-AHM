export default class ENV {
    public static BASE_URL = process.env.BASE_URL || ""
    public static COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || ""
    public static ADMIN_USER_NAME = process.env.ADMIN_USER_NAME || ""
    public static ADMIN_USER_PASSWORD = process.env.ADMIN_USER_PASSWORD || ""
    public static NON_ADMIN_USER_NAME = process.env.NON_ADMIN_USER_NAME || ""
    public static NON_ADMIN_USER_PASSWORD = process.env.NON_ADMIN_USER_PASSWORD || ""
    public static INVALID_USER_PASSWORD= process.env.INVALID_USER_PASSWORD || ""
    public static INVALID_USER_NAME = process.env.INVALID_USER_NAME || ""
    public static API_BASE_URL = process.env.API_BASE_URL || ""
}