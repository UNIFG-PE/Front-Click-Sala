import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class ErroPopup extends JFrame {

    public ErroPopup() {
        setTitle("Erro");
        setSize(300, 150);
        setLayout(new FlowLayout());
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        JLabel mensagemLabel = new JLabel("Não foi possível criar a sala.");
        JLabel detalheLabel = new JLabel("Tente novamente.");
        JButton voltarButton = new JButton("Voltar");

        add(mensagemLabel);
        add(detalheLabel);
        add(voltarButton);

        voltarButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                dispose(); // Fecha o popup
            }
        });

        setLocationRelativeTo(null); // Centraliza na tela
        setVisible(true);
    }
}
