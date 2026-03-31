/**
 * İletişim modalı: Formspree ile fetch; window.RK_FORMSPREE_URL contact-config.js içinde.
 */
(function () {
  "use strict";

  var dialog = document.getElementById("contact-modal");
  var form = document.getElementById("contact-modal-form");
  var statusEl = document.getElementById("contact-modal-status");
  var submitBtn = document.getElementById("contact-modal-submit");

  if (!dialog || !form) return;

  function getEndpoint() {
    return window.RK_FORMSPREE_URL || "";
  }

  function setStatus(msg, isError) {
    if (!statusEl) return;
    statusEl.textContent = msg || "";
    statusEl.hidden = !msg;
    statusEl.classList.toggle("is-error", !!isError);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var url = getEndpoint();
    if (!url) {
      setStatus("Form uç noktası yapılandırılmamış.", true);
      return;
    }

    var fd = new FormData(form);
    var hp = form.querySelector('input[name="_gotcha"]');
    if (hp && hp.value) {
      setStatus("Gönderilemedi. Lütfen tekrar deneyin.", true);
      return;
    }

    setStatus("");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-busy", "true");
    }

    fetch(url, {
      method: "POST",
      body: fd,
      headers: { Accept: "application/json" },
    })
      .then(function (res) {
        if (res.ok) {
          setStatus("Mesajınız gönderildi. Teşekkürler!");
          form.reset();
        } else {
          return res.json().then(function (data) {
            var err = (data && data.error) || "Bir sorun oluştu.";
            throw new Error(err);
          });
        }
      })
      .catch(function () {
        setStatus("Mesaj gönderilemedi. E-posta veya WhatsApp deneyin.", true);
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.removeAttribute("aria-busy");
        }
      });
  });

  document.querySelectorAll('[data-open-contact-modal="true"]').forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      }
    });
  });
})();
