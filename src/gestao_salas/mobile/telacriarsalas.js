

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class TelaCriarSala extends JFrame {
    private JTextField tituloField;
    private JCheckBox tvCheck, wifiCheck, projetorCheck, microfoneCheck;
    private JComboBox<String> tipoCombo, campusCombo;
    private JTextField localizacaoField;
    private JButton criarButton;

    public TelaCriarSala() {
        setTitle("Criar Sala");
        setSize(400, 500);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new FlowLayout());

        add(new JLabel("Título da Sala:"));
        tituloField = new JTextField(20);
        add(tituloField);

        add(new JLabel("Descrição da Sala:"));
        tvCheck = new JCheckBox("Televisão");
        wifiCheck = new JCheckBox("Wi-Fi");
        projetorCheck = new JCheckBox("Projetor");
        microfoneCheck = new JCheckBox("Microfone");
        add(tvCheck);
        add(wifiCheck);
        add(projetorCheck);
        add(microfoneCheck);

        add(new JLabel("Tipo de Sala:"));
        tipoCombo = new JComboBox<>(new String[]{"Selecionar", "Aula", "Reunião"});
        add(tipoCombo);

        add(new JLabel("Escolher Campus:"));
        campusCombo = new JComboBox<>(new String[]{"Selecionar", "Campus 1", "Campus 2"});
        add(campusCombo);

        add(new JLabel("Localização:"));
        localizacaoField = new JTextField("1º andar", 20);
        add(localizacaoField);

        criarButton = new JButton("Criar");
        add(criarButton);

        criarButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Aqui simula o erro ao tentar criar
                new ErroPopup();
            }
        });

        setVisible(true);
    }

    public static void main(String[] args) {
        new TelaCriarSala();
    }
}
