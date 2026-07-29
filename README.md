# Kanban Board Layihəsi

Bu layihə tapşırıqların idarə olunması üçün nəzərdə tutulmuş interaktiv bir Kanban lövhəsi tətbiqidir. İstifadəçilər öz tapşırıqlarını daxil edə, statuslarını dəyişə və prioritetlərinə görə nizamlaya bilərlər.

## Layihənin Əsas Xüsusiyyətləri

* Dinamik İnterfeys və Render: Tapşırıqlar JavaScript daxilində saxlanılan data əsasında dinamik olaraq vizual sütunlara paylanır. Hər sütun üzrə tapşırıq sayğacı və boş sütun bildirişləri avtomatik idarə olunur.
* Tapşırıqların İdarə Edilməsi: Modal pəncərə vasitəsilə yeni tapşırıq əlavə etmək, mövcud tapşırıqları redaktə etmək və silmək imkanı mövcuddur.
* Sütunlararası Drag and Drop: HTML5 Drag and Drop API istifadə olunaraq kartların Gözləmədə, İcra olunur və Tamamlandı sütunları arasında sürüklənərək statuslarının dəyişdirilməsi təmin edilmişdir.
* LocalStorage İnteqrasiyası: Bütün məlumatlar brauzerin yerli yaddaşında saxlanılır. Səhifə yeniləndikdə və ya brauzer bağlandıqda daxil edilmiş verilənlər silinmir.
* Axtarış və Filtrləmə: Açar sözlərə görə canlı axtarış və prioritet səviyyəsinə görə filtrləmə funksionallığı mövcuddur.
* Təhlükəsizlik və Doğrulama: XSS hücumlarının qarşısını almaq üçün mətnlər sanitize olunur. Eyni zamanda eyni başlıqlı təkrarlanan tapşırıqların əlavə edilməsi engəllənir.
* Responsiv Dizayn: CSS Grid və Flexbox strukturu vasitəsilə tətbiq bütün mobil, planşet və masaüstü ekran ölçülərinə tam uyğunlaşdırılmışdır.

## Texnologiyalar

* HTML5
* CSS3 (BEM metodologiyası ilə)
* Vanilla JavaScript (ES6+)