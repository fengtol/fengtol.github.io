from lanzou.api import LanZouCloud
import requests
import sys


def handler(fid, is_file):
    if is_file:
        lzy.set_desc(fid, '文件由GitHub Action修改', is_file=True)
        print("已上传")
def show_progress(file_name, total_size, now_size):
    """显示进度的回调函数"""
    percent = now_size / total_size
    bar_len = 40  # 进度条长总度
    bar_str = '>' * round(bar_len * percent) + '=' * round(bar_len * (1 - percent))
    print('\r{:.2f}%\t[{}] {:.1f}/{:.1f}MB | {} '.format(percent * 100, bar_str, now_size / 1048576, total_size / 1048576, file_name), end='')
    if total_size == now_size:
        print('')  # 下载完成换行
def upload(path, id):
    print('开始上传文件')
    code = lzy.upload_file(path, id, callback=show_progress, uploaded_handler=handler)
    return code
if __name__ == "__main__":
    ylogin = sys.argv[1]
    phpdisk_info = sys.argv[2]
    ServerChan = sys.argv[3]
    lzy = LanZouCloud()
    cookie = {'ylogin': ylogin, 'phpdisk_info': phpdisk_info}
    if lzy.login_by_cookie(cookie) == LanZouCloud.SUCCESS:
        ls = lzy.get_dir_list()
        modid = ls.name_id["Main"]
        if upload("Main.7z", modid) == LanZouCloud.SUCCESS:
            print("上传成功")
        else:
            print("失败重试")
            if upload("Main.7z", modid) != LanZouCloud.SUCCESS:
                requests.get('http://sc.ftqq.com/{ServerChan}.send?text=蓝奏云上传失败2次！')
                print("失败")
    else:
        requests.get('http://sc.ftqq.com/{ServerChan}.send?text=蓝奏云登录失败！')
