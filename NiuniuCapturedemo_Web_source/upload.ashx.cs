using System;
using System.Data;
using System.Web;
using System.Collections;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.IO;

namespace CaptureUpload
{
    /// <summary>
    /// $codebehindclassname$ 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    public class Upload : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string strValue = SavePictureAndReturn(context);
            context.Response.Write(strValue);
        }

        private string SavePictureAndReturn(HttpContext context)
        {
            string data = context.Request["picdata"];
            byte[] byteData = null;

            byteData = Convert.FromBase64String(data);
            string strExtendName = "jpg";
            try{
                strExtendName = context.Request["extendName"];
            }
            catch(Exception ee)
            {
            
            }
            string imageName = "picsave." + strExtendName;
            File.WriteAllBytes(System.AppDomain.CurrentDomain.BaseDirectory + imageName, byteData);
            //{"code":0,"info":"URL"}
            int retCode = 0;
            string strInfo = context.Request.Url.ToString().ToLower();
            strInfo = strInfo.Substring(0, strInfo.IndexOf("upload.ashx"));
            strInfo += imageName + "?ttt=" + DateTime.Now.ToFileTime();
            return "{" + string.Format("\"code\":{0},\"info\":\"{1}\"", retCode, strInfo) + "}";            
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
