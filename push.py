from lanzou.api import LanZouCloud
import requests
import sys


def handler(fid, is_file):
    if is_file:
        lzy.set_desc(fid, '文件由GitHub Action修改', is_file=True)
        print("已上传")


if __name__ == "__main__":
    ylogin = sys.argv[1]
    phpdisk_info = sys.argv[2]
    ServerChan = sys.argv[3]
    lzy = LanZouCloud()
    cookie = {'ylogin': ylogin, 'phpdisk_info': phpdisk_info}
    if lzy.login_by_cookie(cookie) == LanZouCloud.SUCCESS:
        ls = lzy.get_dir_list()
        modid = ls.name_id["Main"]
        lzy.upload_file("./Main.7z", modid, uploaded_handler=handler)
    else:
        requests.get('http://sc.ftqq.com/{ServerChan}.send?text=蓝奏云登录失败！')
