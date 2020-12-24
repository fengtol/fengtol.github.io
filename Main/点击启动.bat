cd /d  %~dp0
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers" /V %cd%\Main.exe /t REG_SZ /D DPIUNAWARE /F
start /affinity 1 Main.exe

