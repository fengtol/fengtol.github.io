from lanzou.api import LanZouCloud
import requests
import sys

lzy = LanZouCloud()

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
def upload(path, id, trynum=1, num=0):
    """ path:文件路径 id:文件夹id trynum:可执行次数 num:执行次数 """
    print('开始上传文件')
    code = lzy.upload_file(path, id, callback=show_progress, uploaded_handler=handler)
    num += 1
    if code != LanZouCloud.SUCCESS and trynum > num:
        print("失败重试")
        upload(path, id, trynum, num)
    elif code != LanZouCloud.SUCCESS:
        print("上传失败")
    elif code == LanZouCloud.SUCCESS:
        print("上传成功")
    return code
if __name__ == "__main__":
    ylogin = sys.argv[1]
    phpdisk_info = sys.argv[2]
    ServerChan = sys.argv[3]
    un_cover = False
    print(len(sys.argv))
    if len(sys.argv)>=5:
        un_cover = True
    cookie = {'ylogin': ylogin, 'phpdisk_info': phpdisk_info}
    if lzy.login_by_cookie(cookie) == LanZouCloud.SUCCESS:
        ls = lzy.get_dir_list()
        modid = ls.name_id["Main"]
        if un_cover:
            listf = lzy.get_file_list(modid)
            if 'Main.7z' not in listf.all_name:
                upload("./Main.7z", modid, 3)
        else:
            upload("./Main.7z", modid, 3)
    else:
        requests.get(f'http://sc.ftqq.com/{ServerChan}.send?text=蓝奏云登录失败！')
