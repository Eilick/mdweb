
import request from './main' //引入axios的封装方法

export default {
    getAdBudgetList: (budgetFrom, budgetTo) => {
        return request('post', '/power/faraday/candidates', {
            lower_limit: budgetFrom,
            upper_limit: budgetTo,
            capacity: 100
        });
    },

    getAdPlanList: (data) => {
        return request('get', '/reality/ads/adplan_list', data);
    },

    //广告精益矩阵
    getMatrixGroup: (url, data) => {
        return request('post', url, data);
    },
    getRandomAdid: (data) => {
        return request('post', '/reality/ads/random_adid', data);
    },
    getRandomPvid: () => {
        return request('get', '/space/lean_matrix/random_pv');
    },
    getAdInfo: (data) => {
        return request('get', '/reality/ads/adinfo', data);
    },
    getHistoryData: (data) => {
        return request('post', '/space/lean_matrix/api_adcode_count', data);
    },
    getAllData: () => {
        return request('get', '/space/lean_matrix/engine_success');
    },
    getMatrixData: (data) => {
        return request('post', '/space/lean_matrix/api_matrix2', data);
    },
    getMatrixRate: (adid) => {
        return request('post', '/space/lean_matrix/matrix_rates', {
            adid
        });
    },
    getMatrixTrafficData: (pvid) => {
        return request('get', '/space/lean_matrix/pv_matrix', { pvid: pvid });
    },
    getAdConsumeList: (adid, days) => {
        return request('get', '/space/lean_matrix/ad_comsume_list?ad_id=' + adid + '&days=' + days);
    },

    getChartsData: (code, subcode, time) => {
        return request('post', '/space/lean_matrix/api_bidlist', {
            code,
            subcode,
            start_time: time[0],
            end_time: time[1]
        });
    },
    getRebackReason: (data) => {
        return request('post', '/mind/ad_recall/attribution_analysis', data);
    },

    //概览
    getGlobalStatInfo: (product) => {
        return request('post', '/reality/index/home', {
            product
        });
    },
    getOcpxGlobalStatInfo: (product) => {
        return request('get', '/reality/ocpx/today_stat', {
            product
        });
    },
    getChartLineData: (product, theme, date) => {
        return request('post', '/reality/index/family_distribution', {
            product, theme, date
        });
    },
    getPriceTabData: (product, bid_type, date) => {
        return request('post', '/reality/index/bidprice_distribution', {
            product, bid_type, date
        });
    },
    getOnlineAdData: (product, theme, date) => {
        return request('post', '/reality/index/kindred_distribution', {
            product, theme, date
        });
    },
    getCustomerFansData: (product, date) => {
        return request('post', '/reality/index/fans_distribution', {
            product, date
        });
    },
    getCustomerIndustryData: (pd) => {
        return request('post', '/reality/index/industry_distribution', pd);
    },
    getTop10ConsumeCustomer: (pd, date) => {
        return request('post', '/reality/index/custid_top', pd, date);
    },
    getTop10ConsumeAdPlan: (pd, date) => {
        return request('post', '/reality/index/adid_top', pd, date);
    },
    getCustomersBudgetConsume: (type, date) => {
        return request('get', '/reality/index/consume_budget_ratio', type, date);
    },

    //广告效果分析
    getOneAdId: (product, bid_type) => {
        return request('post', '/reality/ads/random_adid', {
            product: product,
            bid_type: bid_type
        });
    },
    randomGetOcpxAdId: () => {
        return request('get', '/reality/ads/random_ocpx_adid');
    },
    getBudgetAndCost: (theme, uType, date, curTrenType) => {
        return request('post', '/reality/ocpx/' + curTrenType, {
            product: "sfst",
            op_type : uType + '',
            theme: theme,
            date: date
        });
    },
    getCostAndFillData: (data) => {
        return request('post', '/reality/ocpx/ocpx_cost', data);
    },
    getOcpmOcpxDetailList: (curTrenType, product, theme) => {
        return request('post', '/reality/ocpx/' + curTrenType, {
            product: product,
            theme: theme,
        });
    },
    getCtrData: (product, date, adid) => {
        return request('post', '/reality/ocpx/ocpx_ctrcvr', {
            product: product,
            date: date,
            adid: adid
        });
    },
    getActiveSheet: (obj, start_time, end_time) => {
        obj.start_time = start_time;
        obj.end_time = end_time;
        return request('get', '/power/active/active_sheet', obj)
    },
    getActiveListData: (id, type, start_time, end_time) => {
        return request('get', '/power/active/active_sheet2', {
            req_type: type,
            id: id,
            start_time: start_time,
            end_time: end_time
        })
    },
    getActiveGraph: (id, type, start_time, end_time) => {
        return request('get', '/power/active/active_graph', {
            req_type: type,
            id: id,
            start_time: start_time,
            end_time: end_time
        })
    },

    //广告消息中心
    getMsgList: (data) => {
        return request('get', '/insights/tenma_msg_list', data);
    },
    getTenmaAllMsgCount: () => {
        return request('get', '/insights/tenma_today_msg_count');
    },
    getTenmaMsgTpStat: () => {
        return request('get', '/insights/today_tp_stat');
    },
    getTenmaMsgTypeConfig: () => {
        return request('get', '/insights/tenma_msg_conf');
    },
    getRandomMsgList: () => {
        return request('get', '/insights/random_tenma_today_msg');
    },
    getTenmaErrorMsgCount: () => {
        return request('get', '/insights/tenma_msg_count');
    },
    getTenmaErrorMsgList: (data) => {
        return request('get', '/insights/tenma_error_list', data);
    },
    getTenmaActionTypeConfig: () => {
        return request('get', '/insights/tenma_msg_type_config');
    },
    getActionMsgStat: (actionCode) => {
        return request('get', '/insights/tenma_msg_err_stat?action_code=' + actionCode);
    },
    getActionMsgChartData: (actionCode) => {
        return request('get', '/insights/tenma_msg_chart_data?action_code=' + actionCode);
    },

    //开普勒中心
    getDetailList: (custId, currentDate) => {
        return request('post', '/power/kepler/query_cust_info', {
            cust_id: custId,
            date: currentDate
        });
    },
    getReserveTotalList: (custId, currentDate) => {
        return request('post', '/power/kepler/query_date_sum_cust', {
            cust_id: custId,
            date: currentDate
        });
    },
    getRes: (data) => {
        return request('post', '/power/kepler/query_kepler', data);
    },
    changeRatio: (data) => {
        return request('post', '/power/kepler/update_cust_ratio', data);
    },
    getRatio: (custid) => {
        return request('post', '/power/kepler/query_cust_ratio', {
            cust_id: custid
        });
    },
    getSingleData: (custid) => {
        return request('post', '/power/kepler/uid_has_followers', {
            cust_id: custid
        });
    },
    getMultipleData: (myuid1, myuid2) => {
        return request('post', '/power/kepler/uids_relation', {
            uid1: myuid1,
            uid2: myuid2
        });
    },
    getLogData: (obj) => {
        return request('get', '/mind/debug_log/analysis', obj);
    },

    convertMid: (mid) => {
        return request('get', '/tool/convert_mid?mid=' + mid);
    },
    batchGetUserInfo: (uids) => {
        return request('get', '/insights/cust_infos?cust_id=' + uids.join(","));
    },
    getExposuresByUid: (uid, begin, end) => {
        return request('get', '/tool/real_exposure', {
            uid, begin, end
        });
    },
    getFeedBackByUid: (uid, begin, end) => {
        return request('get', '/faraday/tool/unlike', {
            uid, begin, end
        });
    },
    getRbdData: (trade_area_codes) => {
        return request('get', '/tool/trade_code_transfer', {
            trade_area_codes
        });
    },
    getUserPic: (uid) => {
        return request('get', '/faraday/tool/weibo_user_info', {
            uid
        });
    },

    //添加页面权限
    getUserAccess: (user) => {
        return request('get', '/faraday/insights/get_page_access', {
            username: user
        });
    },
    addUserAccess: (username, page_list) => {
        return request('post', '/faraday/insights/add_page_access', {
            username, page_list
        });
    },
    getLogKeepUsers: () => {
        return request('get', '/mind/debug_log/uids');
    },

    //Go ---------------------------------Go------------------------------
    getCustomer: (custId) => {
        return request('get', '/faraday/weibo/user', {
            uid: custId
        });
    },
    batchGetCustomer: (custIds) => {
        return request('get', '/faraday/weibo/users', {
            uid: custIds
        });
    },
    getCustomerFinance: (custId) => {
        return request('get', '/reality/ads/customer_info', {
            cust_id: custId
        });
    },
    getAdPlanStatTimeline: (adId) => {
        return request('get', '/faraday/insights/ad_time_line', {
            ad_id: adId
        });
    },
    getAdPlanUpdateList: (adid, page) => {
        return request('get', '/faraday/insights/ad_update_list?ad_id=' + adid + '&page=' + page);
    },
    getAdGenderStat: (adid) => {
        return request('get', '/faraday/insights/ad_plan_gender_demographic?ad_id=' + adid);
    },
    getRandomSelectAdPlan: (p) => {
        return request('get', '/faraday/insights/random_ad_plan', p);
    },
    getCustomerConsumeList: (customerId) => {
        return request('get', '/reality/ads/customer_consume_list', {
            cust_id: customerId
        });
    },//账户日流水（一日前

    getCustomerBalanceList: (customerId) => {
        return request('get', '/reality/ads/customer_info', {
            cust_id: customerId
        });
    },
    getCustomerAdPlanList: (customerId, page) => {
        return request('get', '/faraday/insights/ad_plan_list_by_cust_id', {
            customer_id: customerId,
            page: page
        });
    },
    //广告计划洞察
    getAdPlanInfoByAdid: (adid, pdcode) => {
        return request('get', '/faraday/perspective/ad_plan_info?ad_id=' + adid + '&product_code=' + pdcode);
    },
    getTop10AdPlanList: (customerId) => {
        return request('get', '/reality/ads/top_ad_plan?cust_id=' + customerId);
    },

    //广告创意标签
    getMid: (mid) => {
        return request('get', '/faraday/tool/msg_type', {
            mid: mid
        });
    },
    getQuotaNoticeList: (page, type) => {
        return request('get', '/faraday/insights/today_quota_notice_list', {
            page: page,
            cause_type: type,
        });
    },
    getQuotaNoticeListById: (page, type, id) => {
        return request('get', '/faraday/insights/search_quota_notice_list', {
            page: page,
            cause_type: type,
            cause_id: id
        });
    },
    getQuotaNoticeLineData: (type) => {
        return request('get', '/faraday/insights/quota_notice_line', {
            cause_type: type,
        });
    },
    getCustomerCalibration: (custid, product) => {
        return request('get', '/faraday/insights/customer_calibration', {
            cust_id: custid,
            product: product,
        });
    },
    getCalibrationList: (page, product) => {
        return request('get', '/faraday/insights/calibration_balance_list', {
            page: page,
            product: product,
        });
    },
    getRandomSelectCustomer: () => {
        return request('post', '/reality/ads/random_customerid');
    },
    getChargeList: (custId) => {
        return request('get', '/faraday/insights/customer_charge_list?cust_id=' + custId);
    },

    //人群用户查询
    getUserFrequency: (data) => {
        return request('get', '/faraday/tool/frequency', data);
    },
    //广告计划列表
    getAdplanList: (campaignId) => {
        return request('get', '/faraday/insights/ad_plan_list_by_cid?campaign_id=' + campaignId);
    },

    getAdplanList: (campaignId) => {
        return request('get', '/faraday/insights/ad_plan_list_by_cid?campaign_id=' + campaignId);
    },

    getSentimentAnaly: (page) => {
        return request('get', '/faraday/insights/sentiment_analysis_list', {
            page
        });
    },
    getSentimentStat: () => {
        return request('get', '/faraday/insights/sentiment_stat_chart');
    },


    getOcpxAdStatList: (params) => {
        return request('get', '/reality/ocpx/ad_list', params);
    },

    getOcpxAdChart: (dataType, promotionType, date, psid) => {
        return request('get', '/reality/ocpx/chart', {
            data_type: dataType,
            promotion_type: promotionType,
            date: date,
            psid: psid,
        });
    },
    getAdCtrChart: (adId, dataType) => {
        return request('get', '/reality/ocpx/ad_chart', {
            ad_id: adId,
            data_type: dataType
        });
    },

    getCustConsumeAnaly(date) {
        return request('get', '/reality/index/customer_consume_analysis', {
            date
        });
    },
    getPandoraItemList(p) {
        return request('post', '/mind/debug_log/black/view_items', p);
    },
    addPandoraItem(p) {
        return request('post', '/mind/debug_log/black/add_item', p);
    },
    getOcpxAccumulative(dataType) {
        return request('get', '/reality/ocpx/ocpx_accumulative', {
            data_type: dataType
        });
    },
    getDayOcpxAccumulative(date) {
        return request('get', '/reality/ocpx/day_ocpx_accumulative', {
            date
        });
    },
    getOcpxRealBudget(dataType) {
        return request('get', '/reality/ocpx/real_budget', {
            data_type: dataType
        });
    },
    getDayOcpxRealBudget(date) {
        return request('get', '/reality/ocpx/day_real_budget', {
            date
        });
    },
    getOcpxAdCostData(adId, fromTime, endTime) {
        return request('get', '/faraday/insights/cpl_cost', {
            ad_id: adId,
            from: fromTime,
            to: endTime,
        });
    },
    randomOcpxObject(ocpxType) {
        return request('get', '/faraday/insights/random_ocpx_object', {
            promotion_obj_type: ocpxType,
        });
    },
    getOcpxCplCompare(adId, fromTime, endTime) {
        return request('get', '/faraday/insights/ocpx_cpl_compare', {
            ad_id: adId,
            from: fromTime,
            to: endTime,
        });
    },
    getCplPostback(adId, fromTime, endTime) {
        return request('get', '/faraday/insights/ocpx_cpl_postback', {
            ad_id: adId,
            from: fromTime,
            to: endTime,
        });
    },
    getCplPostbackHour(adId, day) {
        return request('get', '/faraday/insights/ocpx_cpl_postback_hour', {
            ad_id: adId,
            day: day,
        });
    },
    getKingIps() {
        return request('get', '/faraday/insights/king_ips');
    },
    getWaxDspList() {
        return request('get', '/wax/dsplist');
    },
    getDspCrstyList(dsp_id) {
        return request('get', '/wax/crlist', {
            dsp_id
        });
    },
    getWaxMatrixData(p) {
        return request('get', '/wax/lean_matrix', p);
    },
    getOcpxAppList(objType) {
        return request('get', '/faraday/insights/ocpx_app_list', {
            object_type : objType,
        });
    },
    getOcpxCplList(objType) {
        return request('get', '/faraday/insights/ocpx_cpl_list', {
            object_type : objType,
        });
    },
    getOcpxAppTrend(p) {
        return request('get', '/faraday/insights/ocpx_app_trend_hour', p);
    },
    getOcpxAppDayTrend(p) {
        return request('get', '/faraday/insights/ocpx_app_trend_day', p);
    },
    getOcpxApSendDistri(p) {
        return request('get', '/faraday/insights/ocpx_app_send_distribute', p);
    },
    getCplDistribute(params) {
        return request('get', '/faraday/insights/ocpx_cpl_distribute', params);
    },
    getCplTrend(params) {
        return request('get', '/faraday/insights/ocpx_cpl_trend', params);
    },
    getLoginUserAccess(params) {
        return request('get', '/user/info', params);
    }
}

