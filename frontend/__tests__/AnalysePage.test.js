import { shallowMount } from "@vue/test-utils";
import AnalysePage from "@/views/AnalysePage.vue";
import axios from "axios";
import { BrowserMultiFormatReader } from "@zxing/browser";

jest.mock("axios");

jest.mock("@zxing/browser", () => {
  return {
    BrowserMultiFormatReader: jest.fn().mockImplementation(() => ({
      decodeOnceFromVideoDevice: jest.fn().mockResolvedValue({ text: "1234567890123" }),
    })),
  };
});

describe("AnalysePage.vue", () => {
  let wrapper;

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date("2025-01-01T00:00:00.000Z"));

    window.alert = jest.fn();

    wrapper = shallowMount(AnalysePage);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("affiche le composant correctement", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("h1").text()).toBe("Analyser un aliment");
  });

  it("affiche une alerte si le code-barres est vide", async () => {
    wrapper.setData({ codeBarre: "" });
    await wrapper.vm.verifierAliment();
    expect(window.alert).toHaveBeenCalledWith("Veuillez entrer un code-barre.");
  });

  it("affiche une alerte si le code-barres contient autre chose que des chiffres", async () => {
    wrapper.setData({ codeBarre: "ABC123" });
    await wrapper.vm.verifierAliment();
    expect(window.alert).toHaveBeenCalledWith("Le code-barre doit uniquement contenir des chiffres.");
  });

  it("vérifie un aliment et met à jour les résultats", async () => {
    const mockResponse = {
      data: {
        allergenes: ["Gluten"],
        barcode_name: "Pâtes",
        imageUrl: "/images/pates.jpg",
      },
    };
    axios.get.mockResolvedValueOnce(mockResponse);
    jest.spyOn(wrapper.vm, "getUserRestrictions").mockResolvedValueOnce(["gluten"]);

    wrapper.setData({ codeBarre: "1234567890123" });
    await wrapper.vm.verifierAliment();

    expect(wrapper.vm.resultat).toEqual({
      nomAliment: "Pâtes",
      imageUrl: `${process.env.VUE_APP_URL_BACKEND}/images/pates.jpg?t=1735689600000`,
      allergenes: ["Gluten"],
      allergenesProbleme: ["Gluten"],
      peutManger: false,
      message: null,
      source: "",
    });
    expect(wrapper.vm.showModal).toBe(true);
  });

  it("gère une erreur lors de la vérification d'un aliment", async () => {
    axios.get.mockRejectedValue(new Error("Erreur API"));

    wrapper.setData({ codeBarre: "1234567890123" });
    await wrapper.vm.verifierAliment();

    expect(window.alert).toHaveBeenCalledWith(
      "Une erreur est survenue lors de la vérification. Veuillez réessayer."
    );
  });

  it("ferme le modal correctement", () => {
    wrapper.setData({ showModal: true });
    wrapper.vm.closeModal();
    expect(wrapper.vm.showModal).toBe(false);
  });

  it("gère une erreur lors de l'activation du scanner", async () => {
    const mockScanner = new BrowserMultiFormatReader();
    jest.spyOn(mockScanner, "decodeOnceFromVideoDevice").mockRejectedValue(new Error("Erreur API"));

    wrapper.vm.scanner = mockScanner;

    await wrapper.vm.activerScanner();

    expect(window.alert).toHaveBeenCalledWith(
      "Une erreur est survenue lors de la vérification. Veuillez réessayer."
    );
  });
});

